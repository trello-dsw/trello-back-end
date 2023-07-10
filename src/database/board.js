import { DBClient } from './client.js';

export async function createOrUpdateBoard(boardId, email, options) {
  const collection = await DBClient.getBoardCollection();

  if (await collection.findOne({ boardId })) {
    await collection.updateOne({ boardId }, { $set: { ...options } });
    return;
  }

  await collection.insertOne({ email, ...options });
  return;
}

export async function deleteBoard(boardId) {
  const collection = await DBClient.getBoardCollection();

  await collection.deleteOne(boardId);
}

export async function getBoard(boardId) {
  const collection = await DBClient.getBoardCollection();

  return await collection.findOne(boardId);
}

export async function getUserBoards(email) {
  const collection = await DBClient.getBoardCollection();

  return await collection.findMany(email);
}

export async function shareBoard(boardId, email, accessType) {
  const collection = await DBClient.getBoardCollection();
  const board = await collection.findOne({ boardId });
  const shareOptions = { email, accessType };

  const sharedTo = board.sharedTo;
  if (!sharedTo) {
    sharedTo = [shareOptions];
  } else {
    sharedTo.push(shareOptions);
  }

  collection.updateOne({ boardId }, { $set: { sharedTo } });
}
