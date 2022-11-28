import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { auth } from '../middlewares/auth.js';

const taskRouter = express.Router();

taskRouter.route('/create').post(auth, taskController.create);
taskRouter.route('/delete/:taskId').delete(auth, taskController.deleteById);
taskRouter.route('/update/:taskId').patch(auth, taskController.updateById);
///place holder

taskRouter.route('/update').patch(auth, taskController.update); //

taskRouter.route('/delete').delete(auth, taskController.deleteTasks); //
///place holder

export { taskRouter };
