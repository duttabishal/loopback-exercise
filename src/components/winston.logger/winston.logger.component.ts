import {Component, CoreBindings, inject} from '@loopback/core';
import {RestApplication, RestBindings} from '@loopback/rest';
import {LoggerBindings} from './keys';
import {myMiddleware} from './middlewares/myMiddleware.middleware';
import {LogErrorProvider} from './providers/log-error.provider';
import {LoggerProvider} from './providers/logger.provider';
// import {WinstonLoggerService} from './services/logger.service';
import {WinstonLoggerErrorService} from './services/log-error.service';
import {WinstonLoggerService} from './services/logger.service';

export class WinstonLoggerComponent implements Component {
  providers = {};
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private readonly application: RestApplication,
  ) {
    this.providers = {
      'winstonLogger.logger': LoggerProvider,
    };
    this.application
      .bind(LoggerBindings.ERROR_LOGGER)
      .toClass(WinstonLoggerErrorService);
    this.application.bind(LoggerBindings.LOGGER).toClass(WinstonLoggerService);
    this.application
      .bind(RestBindings.SequenceActions.LOG_ERROR)
      .toProvider(LogErrorProvider);
    this.application.middleware(myMiddleware);
  }
}
