import express from 'express';
import { userRouter } from './routers/userRouter.js';
import { taskRouter } from './routers/taskRouter.js';

const routers = express.Router();

routers.use('/user', userRouter);
routers.use('/task', taskRouter);

export { routers };
