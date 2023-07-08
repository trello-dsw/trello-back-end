import bodyParser from 'body-parser';
import express from 'express';

import {
  handleForgot,
  handleLogin,
  handleNewUser,
} from './src/request_handlers.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', async function (req, res) {
  console.log('Just got a new user!');
  await handleNewUser(req, res);
});

app.post('/login', async function (req, res) {
  console.log('Just got a login!');
  await handleLogin(req, res);
});

app.post('/forgot', async function (req, res) {
  await handleForgot(req, res);
});

app.listen(3000);
