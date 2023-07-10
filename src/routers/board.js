import express from 'express';

import {
  createOrUpdateBoard,
  deleteBoard,
  getBoard,
  getUserBoards,
} from '../database/board.js';
import { sendResponse } from '../handlers/utils.js';

export const boardRouter = express.Router();

boardRouter.post('/', async function (req, res) {
  const { boardId, email, options } = req.body;

  try {
    await createOrUpdateBoard(boardId, email, options);
    sendResponse(res, { message: 'Quadro criado ou atualizado.' });
  } catch (e) {
    sendResponse(res, { message: e.message }, 400);
  }
});

boardRouter.get('/:boardId', async function (req, res) {
  sendResponse(res, await getBoard(req.params.boardId));
});

boardRouter.delete('/:boardId', async function (req, res) {
  try {
    await deleteBoard(req.params.boardId);
    sendResponse(res, { message: 'Quadro deletado.' });
  } catch (e) {
    sendResponse(res, { message: e.message }, 400);
  }
});

boardRouter.get('/fromuser/:user', async function (req, res) {
  sendResponse(res, await getUserBoards(req.params.user));
});
