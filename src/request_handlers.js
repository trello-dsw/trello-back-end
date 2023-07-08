import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import {
  createUser,
  getUserFromEmail,
  updateUserPassword,
} from './database/index.js';
import { DBClient } from './database/client.js';
import { sendResetMail } from './email.js';

const EMAIL_NOT_FOUND = 'Não existe um usuário registrado com este e-mail.';
const JWT_PUBLIC_KEY = 'aiusa7s8sdjm,d0-klaj';

export async function handleNewUser(req, res) {
  const { email, password, username } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await createUser(email, encryptedPassword, username);
  } catch (e) {
    sendResponse(res, { message: e.message }, 400);
    return;
  }

  sendResponse(res, { message: 'usuário cadastrado' });
}

export async function handleLogin(req, res) {
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

export async function handleForgot(req, res) {
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

export async function handleReset(req, res) {
  const { email, key, token } = req.query;
  const validToken = jsonwebtoken.verify(token, JWT_PUBLIC_KEY);

  if (!email || !key || !validToken) {
    sendResponse(res, { message: 'Pedido inválido' }, 400);
    return;
  }

  updateUserPassword(email, key);
  sendResponse(res, { message: 'Senha atualizada.' });
}

function sendResponse(res, json, status) {
  DBClient.closeDB();
  res.status(status ?? 200).json(json);
}
