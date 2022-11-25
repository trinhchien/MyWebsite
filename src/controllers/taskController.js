import { taskModel } from '../models/taskModel.js';

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
//////place holder
async function updateById(req, res) {}
async function update(req, res) {}
async function deleteTasks(req, res) {}
async function deleteById(req, res) {}

export { create, update, updateById, deleteTasks, deleteById };
