import { taskModel } from '../models/taskModel.js';
import { isUpdatable } from '../helpers/isUpdatable.js';

async function create(req, res) {
    const newTask = new taskModel({
        ...req.body,
        createdBy: req.user._id,
    });

    try {
        await newTask.save();
        res.status(201).send({ newTask });
    } catch (error) {
        res.status(400).send({ error });
    }
}

async function taskDetail(req, res) {
    try {
        const taskTarget = await taskModel.findOne({
            _id: req.params.taskId,
            createdBy: req.user._id,
        });
        if (!taskTarget) {
            throw new Error(`Can not find this task of user: ${req.user.name}`);
        }
        await taskTarget.populate('createdBy');
        res.send({ taskTarget });
    } catch (error) {
        res.send(error.message);
    }
}

async function updateById(req, res, next) {
    const reqKeys = Object.keys(req.body);
    const updatableKeys = ['name', 'description', 'progress', 'people'];
    if (isUpdatable(reqKeys, updatableKeys)) {
        try {
            const task = await taskModel.findOne({
                _id: req.params.taskId,
                createdBy: req.user._id,
            });
            if (!task) {
                throw new Error(`can not find task`);
            }
            reqKeys.forEach((reqKey) => (task[reqKey] = req.body[reqKey]));
            const updatedTask = await task.save();
            res.send(task);
        } catch (error) {
            res.send(error.message);
        }
    } else {
        res.send('Do not allow to update property');
    }
}
async function deleteById(req, res) {
    try {
        const deletedTask = await taskModel.findOneAndDelete({
            _id: req.params.taskId,
            createdBy: req.user._id,
        });
        res.send(deletedTask);
    } catch (error) {
        res.send(error);
    }
}
async function deleteTasks(req, res) {
    try {
        const listTask = req.body.taskIds;
        const listDeletedTask = listTask.map((taskId) =>
            taskModel.findByIdAndDelete(taskId)
        );
        await Promise.all(listDeletedTask);
        res.send('delete ok');
    } catch (error) {
        console.log(error);
    }
}

async function listTask(req, res) {
    try {
        const Tasks = await taskModel.find({ createdBy: req.user._id });
        res.send(Tasks);
    } catch (e) {
        res.send({ error: e.message });
    }
}
// async function updatebyId(req, res) {
// try {
//     const taskTarget = await taskModel.find({_id: req.params.taskId, createdBy: req.user._id})
//     if(!taskTarget){
//         throw new Error(`Task is not found!`)
//     }
//     const updateReqKeys = Object.keys(req.body);
//     const updatable = ['name', 'description', 'progress', 'people'];
// } catch (e) {

// }
// }

export { create, updateById, deleteTasks, deleteById, taskDetail, listTask };
