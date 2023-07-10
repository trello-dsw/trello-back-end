import express from 'express';

import { newUser } from '../handlers/user.js';
import { login } from '../handlers/login.js';
import {
  forgotPassword,
  loggedPasswordReset,
  resetPassword,
} from '../handlers/password.js';

export const userRouter = express.Router();

userRouter.post('/', async function (req, res) {
  await newUser(req, res);
});

userRouter.post('/login', async function (req, res) {
  await login(req, res);
});

userRouter.post('/forgot', async function (req, res) {
  await forgotPassword(req, res);
});

userRouter.post('/reset', async function (req, res) {
  await resetPassword(req, res);
});

userRouter.post('/logged-reset', async function (req, res) {
  await loggedPasswordReset(req, res);
});
