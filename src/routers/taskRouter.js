import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { auth } from '../middlewares/auth.js';

const taskRouter = express.Router();

taskRouter.route('/create').post(auth, taskController.create);
taskRouter.route('/listTask').get(auth, taskController.listTask);
taskRouter.route('/delete').delete(auth, taskController.deleteTasks);
taskRouter.route('/delete/:taskId').delete(auth, taskController.deleteById);
taskRouter.route('/update/:taskId').patch(auth, taskController.updateById);
taskRouter.route('/:taskId').get(auth, taskController.taskDetail);
// taskRouter.route('/update/:taskId').patch(auth, taskController.updatebyId);

export { taskRouter };
