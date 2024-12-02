import Employee from "../models/employee.js";
import validator from "validator";
import {uploadOnCloudinary} from "../utils/cloudinary.js";

export const createEmployee = async (req, res) => {
    const {name, email, mobile, designation, gender, course} = req.body;
    try {
        if ([name, email, mobile, designation, gender, course].some((field) => field?.trim() === "")) {
            throw new Error("All fields are required");
        }

        // Email Validation
        const emailValidation = validator.isEmail(email);
        const mobileValidation = validator.isNumeric(mobile);

        if (!emailValidation) {
            throw new Error("Provide a Valid Email");
        }
        if (!mobileValidation) {
            throw new Error("Provide a Valid Email");
        }

        const existedUser = await Employee.findOne({
            email,
        });

        if (existedUser) {
            return res.status(400).json({
                message: "User with Email already exists",
            });
        }

        if (!(req.file?.mimetype === "image/png" || req.file?.mimetype === "image/jpg")) {
            throw new Error("Provide a image of either .jpg or .png format");
        }

        const avatarLocalPath = req.file?.path;

        if (!avatarLocalPath) {
            return res.status(400).json({
                message: "Avatar file required",
            });
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);

        const newEmployee = new Employee({
            name, email, mobile, designation, gender, course, avatar: avatar?.url,
        });

        // Save to DB
        await newEmployee.save();

        res.status(201).json({
            message: "Employee added", employee: newEmployee,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getEmployeeDetails = async (req, res) => {
    const employeeId = req.params?.id;
    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            res.status(404).json({
                message: "Employee not found",
            });
        }
        res.status(200).json({
            employee,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const updateEmployeeDetail = async (req, res) => {
    const employeeId = req.params?.id;
    const {name, email, mobile, designation, gender, course, active} = req.body;
    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            res.status(404).json({
                message: "Employee not found",
            });
        }

        // Email Validation
        if (email) {
            const emailValidation = validator.isEmail(email);
            if (!emailValidation) {
                throw new Error("Provide a Valid Email");
            }
        }

        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.mobile = mobile || employee.mobile;
        employee.gender = gender || employee.gender;
        employee.designation = designation || employee.designation;
        employee.active = active || employee.active;
        employee.course = course || employee.course;

        await employee.save();
        res.status(200).json({
            employee,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteEmployee = async (req, res) => {
    const {id} = req.params;
    try {
        const employee = await Employee.findByIdAndDelete(id);

        if (employee === null) {
            return res.status(404).json({message: "Employee not found"});
        }

        return res.status(200).json({
            message: "Employee deleted Successfully",
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const getAllEmployees = async (req, res) => {

    const {
        page = "1",
        limit = "10",
        sortOrder = "asc",
        sortField = "createDate",
        active = true,
        search = ''
    } = req.query;

    try {
        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);

        // sorting based on order on the query field
        const sortOptions = {sortField: sortOrder === "asc" ? 1 : -1};
        const query = {active: active === true, name: {$regex: search, $options: "i"}}
        const data = await Employee.find(query).sort(sortOptions).skip((pageNumber - 1) * pageSize).limit(pageSize);
        const totalCount = await Employee.countDocuments(query);
        const totalActiveEmployees = await Employee.countDocuments({...query, active: true});

        return res.status(200).json({
            employees: data,
            totalEmployees: totalCount,
            totalActiveEmployees: totalActiveEmployees,
            pagination: {
                totalItems: totalCount,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalCount / pageSize),
                pageSize,
            },
        });

    } catch (error) {
        return res.status(500).json({
            message: "Fetching employees failed"
        });
    }
}