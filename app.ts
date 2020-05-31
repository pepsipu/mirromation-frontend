import express from 'express';
import chalk from 'chalk';

import 'config/env';
import { expressLogger, logger } from 'config/winston';
import { puppeteerLaunch } from 'api/incapsula';

const app: express.Application = express();
const port: number = +(process.env.PORT || 3000);

app.use(express.json());
app.use(expressLogger);

puppeteerLaunch().then((cookies) => {
  logger.info(`Puppeteer has launched, receiving cookies of length ${chalk.cyan(cookies.length)}.`);
}).catch((error) => {
  logger.error(`Could not fetch cookies with Puppeteer: ${error}`);
});

app.listen(port, () => {
  logger.info(`Express server has started listening on port ${chalk.red(port)}.`);
});
