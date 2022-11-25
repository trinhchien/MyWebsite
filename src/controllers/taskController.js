import { taskModel } from '../models/taskModel.js';
import { isUpdatable } from '../helpers/isUpdatable.js';

async function create(req, res) {
    const newTask = new taskModel(req.body);

    newTask.createdBy = req.user._id;
    try {
        await newTask.save();
        res.status(201).send({ newTask });
    } catch (error) {
        res.status(400).send({ error });
    }
}
async function updateById(req, res, next) {
    const reqKeys = Object.keys(req.body);
    const updatableKeys = ['name', 'description', 'progress', 'people'];
    if (isUpdatable(reqKeys, updatableKeys)) {
        try {
            const task = await taskModel.findById(req.params.taskId);
            reqKeys.forEach((reqKey) => (task[reqKey] = req.body[reqKey]));
            const updatedTask = await task.save();
            res.send(task);
        } catch (error) {
            res.send(error);
        }
    } else {
        res.send('Do not allow to update property');
    }
}
async function deleteById(req, res) {
    try {
        const deletedTask = await taskModel.findByIdAndDelete(
            req.params.taskId
        );
        res.send(deletedTask);
    } catch (error) {
        res.send(error);
    }
}
async function deleteTasks(req, res) {
    // const listTask = req.body.taskIds
    // listTask.forEach((taskId) => )
}
async function update(req, res) {}

export { create, update, updateById, deleteTasks, deleteById };
