import bcrypt from 'bcryptjs';
import { createUser } from './database/index.js';

export async function handleNewUser(req, res) {
  const { email, password, user } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await createUser(email, encryptedPassword, user);
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }

  res.json({ message: 'usuário cadastrado' });
}
