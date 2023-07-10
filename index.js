import bodyParser from 'body-parser';
import express from 'express';

import { boardRouter } from './src/routers/board.js';
import { cardRouter } from './src/routers/card.js';
import { listRouter } from './src/routers/list.js';
import { userRouter } from './src/routers/user.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userRouter);

app.use('/board', boardRouter);

app.use('/list', listRouter);

app.use('/card', cardRouter);

app.listen(3000);
