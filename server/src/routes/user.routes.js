import { Router } from "express";
const userRouter = Router();
import { register, login, logout } from "../controllers/user.controller.js";

// Register Route
userRouter.route("/register").post(register);

// Login Route
userRouter.route("/login").post(login);

// Logout Route
userRouter.route("/logout").post(logout);

export default userRouter;
