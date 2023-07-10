import { DBClient } from './client.js';

export async function createOrUpdateCard(cardId, listId, options) {
  const collection = await DBClient.getCardCollection();

  if (await collection.findOne({ cardId })) {
    await collection.updateOne({ cardId }, { $set: { ...options } });
    return;
  }

  await collection.insertOne({ listId, ...options });
  return;
}

export async function deleteCard(cardId) {
  const collection = await DBClient.getCardCollection();

  await collection.deleteOne(cardId);
}

export async function getCard(cardId) {
  const collection = await DBClient.getCardCollection();

  return await collection.findOne(cardId);
}

export async function getListCards(listId) {
  const collection = await DBClient.getCardCollection();

  return await collection.find(listId).toArray();
}

export async function moveCard(cardId, newList) {
  await collection.updateOne({ cardId }, { $set: { listId: newList } });
}
