import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

import { getUserFromEmail } from '../database/user.js';
import { EMAIL_NOT_FOUND, JWT_PUBLIC_KEY, sendResponse } from './utils.js';

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await getUserFromEmail(email);
  if (!user) {
    sendResponse(res, { message: EMAIL_NOT_FOUND }, 400);
    return;
  }

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    sendResponse(res, { message: 'Senha inválida.' }, 400);
    return;
  }

  const token = jsonwebtoken.sign(user, JWT_PUBLIC_KEY);

  sendResponse(res, { message: 'Login bem sucedido.', token });
}
