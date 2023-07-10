import { DBClient } from './client.js';

export async function addFavorite(boardId, email) {
  const collection = await DBClient.getBoardCollection();
  const board = await collection.findOne({ boardId });

  const favorites = board.favorites;
  if (!favorites) {
    favorites = [email];
  } else {
    favorites.push(email);
  }

  collection.updateOne({ boardId }, { $set: { favorites } });
}

export async function getUserFavorites(email) {
  const collection = await DBClient.getBoardCollection();

  return await collection.findMany({ favorites: email });
}

export async function removeFavorite(boardId, email) {
  const collection = await DBClient.getBoardCollection();
  const board = await collection.findOne({ boardId });

  const favorites = board.favorites;
  const index = favorites.indexOf(email);
  favorites.splice(index, 1);

  collection.updateOne({ boardId }, { $set: { favorites } });
}
