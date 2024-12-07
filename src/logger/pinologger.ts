import pino from 'pino';
import { ILogger } from './ilogger';
import { getFormattedDate, getCallerInfo } from './utils';
import { LoggerConfig, defaultConfig } from './logconfig';
import { Message } from './message';

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

    public error(message: Message): void {
        this.logger.error(message.getFormattedMessage());
    }

    public warn(message: Message): void {
        this.logger.warn(message.getFormattedMessage());
    }

    public info(message: Message): void {
        this.logger.info(message.getFormattedMessage());
    }

    public debug(message: Message): void {
        this.logger.debug(message.getFormattedMessage());
    }

    public trace(message: Message): void {
        this.logger.trace(message.getFormattedMessage());
    }
}