import { userModel } from '../models/userModel.js';
import bcrypt from 'bcrypt';

async function signUp(req, res, next) {
    const newUser = new userModel(req.body);
    try {
        await newUser.save();
        const token = await newUser.generateAuthToken();
        res.status(201).send({ newUser, token });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error });
    }
}

async function login(req, res, next) {
    try {
        const user = await userModel.findByCredentials(
            req.body.email,
            req.body.password
        );

        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (error) {
        res.status(400).send({ error });
    }
}

async function me(req, res, next) {
    res.send(req.user);
}

async function deleteUser(req, res, next) {
    try {
        await req.user.remove();
        res.json(req.user);
    } catch (e) {
        res.json(e);
    }
}

async function update(req, res, next) {
    const updateReqKeys = Object.keys(req.body);
    const updatable = ['name', 'email', 'password', 'age'];
    const isUpdatable = updateReqKeys.every((reqKey) => {
        return updatable.includes(reqKey);
    });
    if (isUpdatable) {
        try {
            updateReqKeys.forEach(
                (reqKey) => (req.user[reqKey] = req.body[reqKey])
            );
            const updatedUser = req.user.save();
            res.json(req.user);
        } catch (error) {
            res.json(error);
        }
    }
}

async function logout(req, res, next) {
    try {
        req.user.tokens.remove({ token: req.token });
        req.user.save();
        res.send('logout complete');
    } catch (error) {
        res.status(400).send(error);
    }
}

async function logoutAll(req, res, next) {
    try {
        req.user.tokens = [];
        req.user.save();
        res.send('logout complete');
    } catch (error) {
        res.status(400).send(error);
    }
}
export { signUp, login, logout, logoutAll, me, deleteUser, update };
