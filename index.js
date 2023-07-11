import bodyParser from 'body-parser';
import express from 'express';

import { boardRouter } from './src/routers/board.js';
import { cardRouter } from './src/routers/card.js';
import { listRouter } from './src/routers/list.js';
import { userRouter } from './src/routers/user.js';
import { favoriteRouter } from './src/routers/favorite.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (_req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/user', userRouter);

app.use('/board', boardRouter);

app.use('/list', listRouter);

app.use('/card', cardRouter);

app.use('/favorite', favoriteRouter);

app.listen(3000);
