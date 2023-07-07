import bodyParser from 'body-parser';
import express from 'express';

import { handleNewUser } from './src/user.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.all('/', async (req, res) => {
  console.log('Just got a request!');
  await handleNewUser(req, res);
});

app.listen(3000);
