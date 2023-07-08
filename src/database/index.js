import { DBClient } from './client.js';

export async function createUser(email, password, username) {
  const collection = await DBClient.getUserCollection();

  if (await collection.findOne({ email })) {
    throw new Error('Já existe um usuário registrado com este e-mail.');
  }

  await collection.insertOne({ email, password, username });
}

export async function getUserFromEmail(email) {
  const collection = await DBClient.getUserCollection();
  const user = await collection.findOne({ email });

  return user;
}

export async function updateUserPassword(email, password) {
  const collection = await DBClient.getUserCollection();
  await collection.updateOne({ email }, { $set: { password } });
}
