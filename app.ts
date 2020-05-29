import express from 'express';
import morgan from 'morgan';
import chalk from 'chalk';

import './config/env';
import logger from './config/winston';
import { puppeteerLaunch } from './api/incapsula';

const app: express.Application = express();

app.use(express.json());
app.use(morgan('dev', {
}));

puppeteerLaunch().then((cookies) => {
  logger.info(`Puppeteer has launched, receiving cookies of length ${chalk.cyan(cookies.length)}.`);
});

app.listen(process.env.PORT || 3000, () => {

});
