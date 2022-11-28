import express from 'express';
import * as userController from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.route('/login').post(userController.login);
userRouter.route('/logout').get(auth, userController.logout);
userRouter.route('/logoutAll').get(auth, userController.logoutAll);
userRouter.route('/signUp').post(userController.signUp);
userRouter
    .route('/forceChangePassword')
    .post(userController.forceChangePassword);
userRouter
    .route('/me')
    .get(auth, userController.me)
    .delete(auth, userController.deleteUser)
    .patch(auth, userController.update);

export { userRouter };
