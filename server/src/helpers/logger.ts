import winston from 'winston';
import config from '../config';

const { log: { level, silent } } = config;

const {
  combine, json, timestamp,
} = winston.format;

const logger = winston.createLogger({
  level,
  format: combine(
    timestamp(),
    json({ space: 4 }),
  ),
  transports: [
    new winston.transports.Console({}),
  ],
  silent,
});

export default logger;
