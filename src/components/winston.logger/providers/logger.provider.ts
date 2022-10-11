import {inject, Provider} from '@loopback/core';
import winston from 'winston';
import {LoggerBindings} from '../keys';
import {WinstonLoggerService} from '../services/logger.service';

export class LoggerProvider implements Provider<winston.Logger> {
  constructor(
    @inject(LoggerBindings.LOGGER)
    protected winstonLogger: WinstonLoggerService,
  ) {}

  value() {
    return this.winstonLogger.logger;
  }
}
