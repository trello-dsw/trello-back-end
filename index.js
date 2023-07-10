import bodyParser from 'body-parser';
import express from 'express';

import { boardRouter } from './src/routers/board.js';
import { userRouter } from './src/routers/user.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userRouter);

app.use('/board', boardRouter);

app.listen(3000);
