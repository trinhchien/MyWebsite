import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import multer from "multer";

global.SECRET_JWT = "chientd1598";

const app = express();

app.use(logger("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer);

const port = process.env.PORT || 3000;

//hello
export { app, port };
