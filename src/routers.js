import express from "express";
import { userRouter } from "./routers/userRouter.js";

const routers = express.Router();

routers.use("/user", userRouter);

export { routers };
