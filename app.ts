import express from 'express';

import './env';
import { puppeteerLaunch } from './api/incapsula';
import searchForTerm from './api/search';

const app: express.Application = express();

app.use(express.json());

puppeteerLaunch().then((cookie) => {
  searchForTerm('kaguya').then((data) => {
    console.log(data);
  });
  app.listen(3000, () => {

  });
});
