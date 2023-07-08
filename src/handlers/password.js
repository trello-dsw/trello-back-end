import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

import { getUserFromEmail, updateUserPassword } from '../database/index.js';
import { EMAIL_NOT_FOUND, JWT_PUBLIC_KEY, sendResponse } from './utils.js';
import { sendResetMail } from '../email.js';

export async function forgotPassword(req, res) {
  const { email, key } = req.body;

  const user = await getUserFromEmail(email);
  if (!user) {
    sendResponse(res, { message: EMAIL_NOT_FOUND }, 400);
    return;
  }

  const encryptedPassword = await bcrypt.hash(key, 10);
  const token = jsonwebtoken.sign(user, JWT_PUBLIC_KEY);

  sendResetMail(email, encryptedPassword, token);
  sendResponse(res, { message: 'Email de recuperação enviado.' });
}

export async function resetPassword(req, res) {
  const { email, key, token } = req.query;
  const user = jsonwebtoken.verify(token, JWT_PUBLIC_KEY);

  if (!email || !key || !user) {
    sendResponse(res, { message: 'Pedido inválido' }, 400);
    return;
  }

  updateUserPassword(email, key);
  sendResponse(res, { message: 'Senha atualizada.' });
}

export async function loggedPasswordReset(req, res) {
  const { oldPassword, newPassword, token } = req.body;

  const tokenUser = jsonwebtoken.verify(token, JWT_PUBLIC_KEY);
  if (!tokenUser) {
    res.status(400).json({ message: 'Acesso não autorizado' });
    return;
  }

  const dbUser = await getUserFromEmail(tokenUser.email);
  if (!dbUser || !(await bcrypt.compare(oldPassword, dbUser.password))) {
    sendResponse(res, { message: 'Credenciais inválidas.' }, 400);
    return;
  }

  const encryptedPassword = await bcrypt.hash(newPassword, 10);
  updateUserPassword(tokenUser.email, encryptedPassword);
  sendResponse(res, { message: 'Senha atualizada.' });
}
