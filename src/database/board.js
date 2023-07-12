import { DBClient } from './client.js';

export async function createOrUpdateBoard(boardId, email, options) {
  const collection = await DBClient.getBoardCollection();
  const { backgroundColor, lists, textColor, title } = JSON.parse(options);

  if (await collection.findOne({ boardId })) {
    await collection.updateOne(
      { boardId },
      { $set: { backgroundColor, textColor, title, lists } }
    );
    return;
  }

  await collection.insertOne({
    boardId,
    email,
    lists,
    backgroundColor,
    textColor,
    title,
  });
  return;
}

export async function deleteBoard(boardId) {
  const collection = await DBClient.getBoardCollection();

  await collection.deleteOne({ boardId });
}

export async function getBoard(boardId) {
  const collection = await DBClient.getBoardCollection();

  return await collection.findOne({ boardId });
}

export async function getUserBoards(email) {
  const collection = await DBClient.getBoardCollection();

  return await collection.find({ email }).toArray();
}

export async function shareBoard(boardId, email, accessType) {
  let collection = await DBClient.getBoardCollection();
  const board = await collection.findOne({ boardId });
  const shareOptions = { email, accessType };

  let sharedTo = board.sharedTo;
  if (!sharedTo) {
    sharedTo = [shareOptions];
  } else {
    sharedTo.push(shareOptions);
  }

  await collection.updateOne({ boardId }, { $set: { sharedTo } });
}

export async function getSharedBoards(email) {
  const readAccess = 'r';
  const writeAccess = 'w';

  const collection = await DBClient.getBoardCollection();

  const readableBoards = await collection
    .find({
      sharedTo: { email, accessType: readAccess },
    })
    .toArray();

  const writableBoards = await collection
    .find({
      sharedTo: { email, accessType: writeAccess },
    })
    .toArray();

  return { readableBoards, writableBoards };
}
