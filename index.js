import bodyParser from 'body-parser';
import express from 'express';

import { newUser } from './src/handlers/user.js';
import { login } from './src/handlers/login.js';
import {
  forgotPassword,
  loggedPasswordReset,
  resetPassword,
} from './src/handlers/password.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', async function (req, res) {
  await newUser(req, res);
});

app.post('/login', async function (req, res) {
  await login(req, res);
});

app.post('/forgot', async function (req, res) {
  await forgotPassword(req, res);
});

app.post('/reset', async function (req, res) {
  await resetPassword(req, res);
});

app.post('/logged-reset', async function (req, res) {
  await loggedPasswordReset(req, res);
});

app.listen(3000);
