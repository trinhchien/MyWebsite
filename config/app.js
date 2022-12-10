import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import * as dotenv from 'dotenv';
import session from 'express-session';
dotenv.config({ path: './config/.env' });

import { engine } from 'express-handlebars';

const app = express();

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    })
);

// console.log(process.cwd() + '/views');

app.get('/', (req, res) => {
    res.render('home');
});

const port = process.env.PORT || 3000;

//hello
export { app, port };
