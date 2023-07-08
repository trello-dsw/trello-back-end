import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { createUser, getUserFromEmail } from './database/index.js';
import { DBClient } from './database/client.js';
import { sendResetMail } from './email.js';

const EMAIL_NOT_FOUND = 'Não existe um usuário registrado com este e-mail.';
const JWT_PUBLIC_KEY = 'aiusa7s8sdjm,d0-klaj';

export async function handleNewUser(req, res) {
  const { email, password, user } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await createUser(email, encryptedPassword, user);
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
  const { email } = req.body;

  const user = await getUserFromEmail(email);
  if (!user) {
    sendResponse(res, { message: EMAIL_NOT_FOUND }, 400);
    return;
  }

  sendResetMail(email);
  sendResponse(res, { message: 'Email de recuperação enviado.' });
}

function sendResponse(res, json, status) {
  DBClient.closeDB();
  res.status(status ?? 200).json(json);
}
