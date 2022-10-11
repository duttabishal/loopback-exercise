import {BindingKey} from '@loopback/core';
import {IWinstonLoggerService} from './services/logger.service';

export namespace LoggerBindings {
  export const LOGGER = BindingKey.create<IWinstonLoggerService>(
    'winstonLoggerService.logger',
  );
  export const ERROR_LOGGER = BindingKey.create<IWinstonLoggerService>(
    'winstonLoggerService.error_logger',
  );
}
