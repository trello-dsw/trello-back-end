import express from 'express';

import {
  addFavorite,
  getUserFavorites,
  removeFavorite,
} from '../database/favorites.js';
import { sendResponse } from '../handlers/utils.js';

export const favoriteRouter = express.Router();

favoriteRouter.get('/:user', async function (req, res) {
  res.send(await getUserFavorites(req.params.user));
  // sendResponse(res, await getUserFavorites(req.params.user))
});

favoriteRouter.post('/', async function (req, res) {
  const { boardId, email } = req.body;
  try {
    await addFavorite(boardId, email);
    sendResponse(res, { message: 'Marcado como favorito' });
  } catch (e) {
    sendResponse(res, { message: e.message }, 400);
  }
});

favoriteRouter.delete('/', async function (req, res) {
  const { boardId, email } = req.body;
  try {
    await removeFavorite(boardId, email);
    sendResponse(res, { message: 'Favorito removido' });
  } catch (e) {
    sendResponse(res, { message: e.message }, 400);
  }
});
