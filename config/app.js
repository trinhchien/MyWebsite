import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const app = express();

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

//hello
export { app, port };
