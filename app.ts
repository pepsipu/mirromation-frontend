import express from 'express';

import './env';
import { puppeteerLaunch } from './api/incapsula';
import { getTitleInformation } from './api/titleInfo';

puppeteerLaunch().then(() => {
  getTitleInformation('800793').then((data) => {
    console.log(data);
  });
});


const app: express.Application = express();

app.use(express.json());

app.listen(3000, () => {

});
