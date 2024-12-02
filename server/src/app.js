import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import cors from "cors";
import path from "path";
import {fileURLToPath} from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.urlencoded({extended: true}));


app.use("/api/auth", userRouter);
app.use("/api/employees", employeeRouter);

// Serve static files from the build folder
const distPath = path.join(__dirname, '..', 'dist');  // Navigate one level up to the 'dist' folder
console.log(distPath);
console.log(path.join(distPath, "index.html"))
app.use(express.static(distPath));

// Serve the index.html file for all non-static requests
app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"))
    }
)

export default app;
