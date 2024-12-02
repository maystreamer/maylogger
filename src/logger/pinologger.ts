import pino from 'pino';
import { ILogger } from './ilogger';
import { getFormattedDate, getCallerInfo } from './utils';
import { LoggerConfig, defaultConfig } from './config';

export class PinoLogger implements ILogger {
    private logger: pino.Logger;
    private config: LoggerConfig;

    constructor(config: LoggerConfig = defaultConfig) {
        this.config = { ...defaultConfig, ...config };
        this.logger = pino({
            level: this.config.level,
            timestamp: () => `,"time":"${getFormattedDate()}"`,
            formatters: {
                log: (logObject) => {
                    const caller = getCallerInfo();
                    return {
                        ...logObject,
                        caller,
                    };
                },
            },
        });
    }

    info(message: string, ...meta: any[]): void {
        this.logger.info(message, ...meta);
    }

    debug(message: string, ...meta: any[]): void {
        if (this.config.isDebugEnabled) {
            this.logger.debug(message, ...meta);
        }
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