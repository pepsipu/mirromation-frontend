import express from 'express';
import morgan from 'morgan';

import './config/env';
import { puppeteerLaunch } from './api/incapsula';

const app: express.Application = express();

app.use(express.json());
app.use(morgan('dev'));

puppeteerLaunch().then(() => {});

app.listen(process.env.PORT || 3000, () => {

});
