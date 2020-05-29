import winston from 'winston';
import chalk from 'chalk';

const logger: winston.Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/log.json' }),
  ],
});

if (process.env.NODE_ENV === 'debug') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.colorize(),
      winston.format.printf((info) => `[${info.level}: ${chalk.yellow(info.timestamp)}] ${info.message}`),
    ),
  }));
}

export default logger;
