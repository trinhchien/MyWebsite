import express from 'express';
import * as userController from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';
import { uploadAvatar } from '../middlewares/fileManager.js';

const userRouter = express.Router();

userRouter.route('/test-avatar/:userId').get(userController.getAvatarById);
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
userRouter
    .route('/me/avatar')
    .post(auth, uploadAvatar.single('avatar'), userController.uploadAvatar)
    .get(auth, userController.getAvatar);

export { userRouter };
