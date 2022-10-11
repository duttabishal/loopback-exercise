import winston from 'winston';

export interface IWinstonLoggerService {
  logger: winston.Logger;
}

export class WinstonLoggerService implements IWinstonLoggerService {
  logger: winston.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
      new winston.transports.File({filename: 'logs/combined.log'}),
    ],
  });
}
