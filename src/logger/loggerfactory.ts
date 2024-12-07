import { ILogger } from './ilogger';
import { WinstonLogger } from './winstonlogger';
import { PinoLogger } from './pinologger';
import { LoggerConfig } from './logconfig';

/**
 * LoggerFactory Class
 * 
 * The `LoggerFactory` class is responsible for creating and returning an appropriate logger instance based on the provided
 * `type` and configuration (`LoggerConfig`). It supports different logging implementations (e.g., `WinstonLogger`, `PinoLogger`)
 * by initializing the corresponding logger class based on the `type` parameter.
 * 
 * - The `getLogger` method validates the `LoggerConfig` for required fields (app name and log directory) and ensures they are
 *   correctly formatted (trimmed and converted to lowercase). If the configuration is invalid, an error is thrown.
 * - Depending on the `type` argument, the method returns an instance of the corresponding logger (either `WinstonLogger` or `PinoLogger`).
 * - If an unsupported logger type is provided, an error is thrown.
 * 
 * This class centralizes the logic for selecting and instantiating different types of loggers, enabling flexibility in the
 * logging system without directly coupling the application to a specific logger implementation.
 */
export class LoggerFactory {
  static getLogger(type: string, config: LoggerConfig): ILogger {
    const appName = (config.appName || '').trim().toLowerCase();
    if (!appName) {
      throw new Error("App name is required in LoggerConfig");
    }

    const dir = (config.dir || '').trim().toLowerCase();
    if (!dir) {
      throw new Error("Log directory is required in LoggerConfig");
    }

    type = (type || '').trim().toLowerCase();
    switch (type) {
      case 'winston':
        return new WinstonLogger(config);
      case 'pino':
        return new PinoLogger(config);
      default:
        throw new Error('Unsupported logger type');
    }
  }
}