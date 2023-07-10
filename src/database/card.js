import { DBClient } from './client.js';

export async function createOrUpdateCard(cardId, listId, options) {
  const { content, createdAt, modifiedAt } = JSON.parse(options);
  const collection = await DBClient.getCardCollection();

  if (await collection.findOne({ cardId })) {
    await collection.updateOne(
      { cardId },
      { $set: { content, createdAt, modifiedAt } }
    );
    return;
  }

  await collection.insertOne({
    cardId,
    listId,
    content,
    createdAt,
    modifiedAt,
  });
  return;
}

export async function deleteCard(cardId) {
  const collection = await DBClient.getCardCollection();

  await collection.deleteOne({ cardId });
}

export async function getCard(cardId) {
  const collection = await DBClient.getCardCollection();

  return await collection.findOne({ cardId });
}

export async function getListCards(listId) {
  const collection = await DBClient.getCardCollection();

  return await collection.find({ listId }).toArray();
}

export async function moveCard(cardId, newList) {
  const collection = await DBClient.getCardCollection();

  await collection.updateOne({ cardId }, { $set: { listId: newList } });
}
