import {Router} from "express";
import {
    createEmployee, deleteEmployee, getAllEmployees, getEmployeeDetails, updateEmployeeDetail,
} from "../controllers/employee.controller.js";
import {upload} from "../middlewares/multer.js";
import {verifyJWT} from "../middlewares/verifyJwt.js";

const employeeRouter = Router();

employeeRouter.route('/').get(verifyJWT, getAllEmployees);

employeeRouter
    .route("/add")
    .post(verifyJWT, upload.single("image"), createEmployee);

employeeRouter.route("/:id").get(verifyJWT, getEmployeeDetails);

employeeRouter
    .route("/:id")
    .put(verifyJWT, updateEmployeeDetail);

employeeRouter.route("/:id").delete(verifyJWT, deleteEmployee);

export default employeeRouter;
