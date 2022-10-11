import winston from 'winston';
import {IWinstonLoggerService} from './logger.service';

export class WinstonLoggerErrorService implements IWinstonLoggerService {
  logger: winston.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
    ],
  });
}
