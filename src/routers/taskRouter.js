import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { auth } from '../middlewares/auth.js';

const taskRouter = express.Router();

taskRouter.route('/create').post(auth, taskController.create);

//GET /api/tasks
// ?progress=complete
// &limit=10
// &skip=10
// &sortBy=createAt:desc

taskRouter.route('/delete').delete(auth, taskController.deleteTasks);
taskRouter.route('/delete/:taskId').delete(auth, taskController.deleteById);
taskRouter.route('/update/:taskId').patch(auth, taskController.updateById);
taskRouter.route('/:taskId').get(auth, taskController.taskDetail);
taskRouter.route('/').get(auth, taskController.listTask);

export { taskRouter };
