import bodyParser from 'body-parser';
import express from 'express';

import {
  handleForgot,
  handleLogin,
  handleNewUser,
  handleReset,
} from './src/request_handlers.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', async function (req, res) {
  await handleNewUser(req, res);
});

app.post('/login', async function (req, res) {
  await handleLogin(req, res);
});

app.post('/forgot', async function (req, res) {
  await handleForgot(req, res);
});

app.post('/reset', async function (req, res) {
  await handleReset(req, res);
});

app.listen(3000);
