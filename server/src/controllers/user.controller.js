import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

// Register Controller
export const register = async function signup(req, res) {
    const {username, password} = req.body;
    try {
        // check if username already exists
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({error: "Username already exists"});
        }

        // Validate the password length
        if (password.length < 6) {
            throw new Error("Password length should be at least 6 characters.");
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username, password: hash,
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({message: "User Registered Successfully"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const login = async function login(req, res) {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username: username});

        if (!user) {
            return res.status(404).json({error: "User not Found"});
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({error: "Invalid credentials"});
        }

        // Generate jwt
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // TODO: add secure flag
        res.cookie('token', token, {
            secure: process.env.NODE_ENV === "production", sameSite: "strict", httpOnly: true
        });

        return res.status(200).json({token, username: user.username});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export const logout = (_req, res) => {
    try {
        res.clearCookie("token", {
            secure: process.env.NODE_ENV === "production", httpOnly: true
        })

        return res.status(200).json({message: "logout Successfully"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};
