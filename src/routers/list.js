import express from 'express';

import {
  createOrUpdateList,
  deleteList,
  getBoardLists,
  getList,
} from '../database/list.js';

export const listRouter = express.Router();

listRouter.post('/', async function (req, res) {
  const { listId, boardId, options } = req.body;

  try {
    await createOrUpdateList(listId, boardId, options);
    sendResponse(res, { message: 'Lista criada ou atualizada.' });
  } catch (e) {
    sendResponse(res, { message: e.message }, 400);
  }
});

listRouter.get('/:listId', async function (req, res) {
  sendResponse(res, await getList(req.params.listId));
});

listRouter.delete('/:listId', async function (req, res) {
  try {
    await deleteList(req.params.listId);
    sendResponse(res, { message: 'Lista deletada.' });
  } catch (e) {
    sendResponse(res, { message: e.message }, 400);
  }
});

listRouter.get('/fromboard/:board', async function (req, res) {
  sendResponse(res, await getBoardLists(req.params.board));
});
