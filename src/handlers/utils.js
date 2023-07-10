import { DBClient } from '../database/client.js';

export const EMAIL_NOT_FOUND =
  'Não existe um usuário registrado com este e-mail.';
export const JWT_PUBLIC_KEY = 'aiusa7s8sdjm,d0-klaj';

export function sendResponse(res, json, status) {
  DBClient.closeDB();
  res.status(status ?? 200).json(json);
}
