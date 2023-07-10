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
    createOrUpdateBoard(boardId, email, options);
    sendResponse(res, { message: 'Quadro criado ou atualizado.' });
  } catch (e) {
    sendResponse(res, { message: e.message }, 400);
  }
});

boardRouter.get('/:boardId', async function (req, res) {
  sendResponse(res, await getBoard(req.params.boardId));
});

boardRouter.delete('/:boardId', async function (req, res) {
  sendResponse(res, await deleteBoard(req.params.boardId));
});

boardRouter.get('/fromuser/:user', async function (req, res) {
  sendResponse(res, await getUserBoards(req.params.user));
});
