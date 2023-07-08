import { DBClient } from './client.js';

export async function createUser(email, password, user) {
  const collection = await DBClient.getUserCollection();

  if (await collection.findOne({ email })) {
    throw new Error('Já existe um usuário registrado com este e-mail.');
  }

  await collection.insertOne({ email, password, user });
}

export async function getUserFromEmail(email) {
  const collection = await DBClient.getUserCollection();
  const user = await collection.findOne({ email });

  return user;
}
