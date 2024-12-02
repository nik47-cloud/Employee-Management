import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const verifyJWT = async (req, res, next) => {
    try {
        // JWT from cookies
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized request",
            });
        }

        // Verify Token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // find user
        const user = await User.findById(decodedToken?.userId).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid Token",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token",
        });
    }
};
