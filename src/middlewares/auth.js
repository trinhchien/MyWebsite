import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, global.SECRET_JWT);

    const user = await userModel.findOne({
      id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("User session does not exist");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error });
  }
};

export { auth };
