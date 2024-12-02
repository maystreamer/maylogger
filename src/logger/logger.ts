import { ILogger } from './ilogger';
import { LoggerConfig } from './config';
import { LoggerFactory } from './loggerfactory';

export class Logger {
    private logger: ILogger;

    constructor(private type: string, private config: LoggerConfig) {
        this.logger = LoggerFactory.getLogger(type, config);
    }

    info(message: string, ...meta: any[]): void {
        this.logger.info(message, ...meta);
    }

    debug(message: string, ...meta: any[]): void {
        this.logger.debug(message, ...meta);
    }

    warn(message: string, ...meta: any[]): void {
        this.logger.warn(message, ...meta);
    }

    error(message: string, ...meta: any[]): void {
        this.logger.error(message, ...meta);
    }

    fatal(message: string, ...meta: any[]): void {
        this.logger.fatal(message, ...meta);
    }
}
