import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";

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

async function logout(req, res, next) {
  try {
    req.user.tokens.remove({ token: req.token });
    console.log(req.user);
    req.user.save();
  } catch (error) {
    res.status(400).send(error);
  }
}

async function logoutAll(req, res, next) {
  try {
    req.user.tokens = [];
    req.user.save();
    res.send("logout complete");
  } catch (error) {
    res.status(400).send(error);
  }
}
export { signUp, login, logout, logoutAll, me };
