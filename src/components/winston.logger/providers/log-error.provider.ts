import {inject, Provider} from '@loopback/core';
import {LogError, Request} from '@loopback/rest';
import {LoggerBindings} from '../keys';
import {IWinstonLoggerService} from '../services/logger.service';

export class LogErrorProvider implements Provider<LogError> {
  constructor(
    @inject(LoggerBindings.ERROR_LOGGER)
    protected winstonLogger: IWinstonLoggerService,
  ) {}

  value() {
    return (err: Error, statusCode: number, req: Request) => {
      this.winstonLogger.logger.error(`
      HTTP ${statusCode} on ${req.method} ${req.url}: ${err.stack ?? err}
      `);
    };
  }
}
