import express from 'express';

import './env';
import { puppeteerLaunch } from './api/incapsula';

const app: express.Application = express();

app.use(express.json());

puppeteerLaunch().then((cookie) => {
  app.listen(3000, () => {

  });
});
