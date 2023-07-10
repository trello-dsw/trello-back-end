import express from 'express';

import {
  createOrUpdateCard,
  deleteCard,
  getCard,
  getListCards,
  moveCard,
} from '../database/card.js';

export const cardRouter = express.Router();

cardRouter.post('/', async function (req, res) {
  const { cardId, boardId, options } = req.body;

  try {
    await createOrUpdateCard(cardId, boardId, options);
    sendResponse(res, { message: 'Cartão criado ou atualizado.' });
  } catch (e) {
    sendResponse(res, { message: e.message }, 400);
  }
});

cardRouter.get('/:cardId', async function (req, res) {
  sendResponse(res, await getCard(req.params.cardId));
});

cardRouter.delete('/:cardId', async function (req, res) {
  try {
    await deleteCard(req.params.cardId);
    sendResponse(res, { message: 'Cartão deletado.' });
  } catch (e) {
    sendResponse(res, { message: e.message }, 400);
  }
});

cardRouter.get('/fromlist/:list', async function (req, res) {
  sendResponse(res, await getListCards(req.params.list));
});

cardRouter.post('/move', async function (req, res) {
  const { cardId, listId } = req.body;
  sendResponse(res, await moveCard(cardId, listId));
  try {
    await moveCard(cardId, listId);
    sendResponse(res, { message: 'Cartão movido' });
  } catch (e) {
    sendResponse(res, { message: e.message }, 400);
  }
});
