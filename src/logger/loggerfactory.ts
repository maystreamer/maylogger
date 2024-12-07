import { ILogger } from './ilogger';
import { WinstonLogger } from './winstonlogger';
import { PinoLogger } from './pinologger';
import { LoggerConfig } from './logconfig';

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