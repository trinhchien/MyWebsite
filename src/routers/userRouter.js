import express from "express";
// import { login, logout, signUp, me } from "../controllers/userController.js";
import * as userController from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.route("/login").post(userController.login);
userRouter.route("/logout").get(auth, userController.logout);
userRouter.route("/logoutAll").get(auth, userController.logoutAll);
userRouter.route("/signUp").post(userController.signUp);
userRouter.route("/me").get(auth, userController.me);
userRouter.route("/");

export { userRouter };
