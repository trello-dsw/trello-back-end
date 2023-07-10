import { DBClient } from './client.js';

export async function createOrUpdateList(listId, boardId, options) {
  const collection = await DBClient.getListCollection();

  if (await collection.findOne({ listId })) {
    await collection.updateOne({ listId }, { $set: { ...options } });
    return;
  }

  await collection.insertOne({ boardId, ...options });
  return;
}

export async function deleteList(listId) {
  const collection = await DBClient.getListCollection();

  await collection.deleteOne({ listId });
}

export async function getList(listId) {
  const collection = await DBClient.getListCollection();

  return await collection.findOne({ listId });
}

export async function getBoardLists(boardId) {
  const collection = await DBClient.getListCollection();

  return await collection.find({ boardId }).toArray();
}
