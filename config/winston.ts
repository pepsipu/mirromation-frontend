import winston from 'winston';
import chalk from 'chalk';
import { TransformableInfo } from 'logform';

const formatInfo = (info: TransformableInfo) => `[${info.level}: ${chalk.yellow(info.timestamp)}] ${info.message}`;

const logger: winston.Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(formatInfo),
  ),
  transports: [
    new winston.transports.File({
      format: winston.format.uncolorize(),
      filename: 'logs/log.log',
    }),
  ],
});

if (process.env.NODE_ENV === 'debug') {
  logger.add(new winston.transports.Console());
}

export default logger;
