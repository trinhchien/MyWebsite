import { userModel } from '../models/userModel.js';
import { isUpdatable } from '../helpers/isUpdatable.js';
import sharp from 'sharp';

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
    } catch (e) {
        console.log(e);
        await res.status(400).send({ error: e.message });
    }
}

async function me(req, res, next) {
    await req.user.populate('tasks');
    res.send({ user: req.user, task: req.user.tasks });
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
    const updatable = ['email', 'password', 'age', 'task'];
    if (isUpdatable(updateReqKeys, updatable)) {
        try {
            updateReqKeys.forEach(
                (reqKey) => (req.user[reqKey] = req.body[reqKey])
            );
            const updatedUser = req.user.save();
            res.json(req.user);
        } catch (error) {
            res.json(error);
        }
    } else {
        res.send('Do not allow to update property');
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

async function forceChangePassword(req, res) {
    try {
        const target = await userModel.findById(req.body.userId);
        target.password = req.body.userPassword;
        const newTarget = await target.save();
        res.send({ newTarget });
    } catch (e) {
        res.send({ error: e.message });
    }
}

async function uploadAvatar(req, res) {
    try {
        const imageBuffer = await sharp(req.file.buffer)
            .resize({ width: 250, height: 250 })
            .png()
            .toBuffer();
        req.user.avatar = imageBuffer;
        await req.user.save();
        res.send('Uploaded avatar');
    } catch (error) {
        res.send(error.message);
    }
}

function getAvatar(req, res) {
    if (!req.user || !req.user.avatar) {
        return res.status(404).send('Avatar not found');
    }
    res.set('Content-Type', 'image/jpg');
    res.send(req.user.avatar);
}

async function getAvatarById(req, res) {
    const user = await userModel.findById(req.params.userId);
    res.set('Content-Type', 'image/jpg');
    res.send(user.avatar);
}
export {
    signUp,
    login,
    logout,
    logoutAll,
    me,
    deleteUser,
    update,
    forceChangePassword,
    uploadAvatar,
    getAvatar,
    getAvatarById,
};
