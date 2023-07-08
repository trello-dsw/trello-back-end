import bcrypt from 'bcryptjs';
import { createUser } from '../database/index.js';
import { sendResponse } from './utils.js';

export async function newUser(req, res) {
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
