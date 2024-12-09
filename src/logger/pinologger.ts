import pino from 'pino';
import { ILogger } from './ilogger';
import { getFormattedDate, getCallerInfo } from './utils';
import { LoggerConfig, defaultConfig } from './logconfig';
import { Message } from './message';

/**
 * PinoLogger Class
 * 
 * The `PinoLogger` class implements the `ILogger` interface using the `pino` logging library. It provides methods for logging
 * messages at different levels of severity (error, warn, info, debug, trace). This class supports custom log formatting, 
 * including the inclusion of a timestamp and caller information, and allows for configuration through the `LoggerConfig`.
 * 
 * - The constructor accepts a `LoggerConfig` object to configure the logging behavior, with a default configuration provided 
 *   by `defaultConfig`. It creates a `pino.Logger` instance, setting the log level and custom timestamp format.
 * - The `formatters` option in `pino` is used to attach additional contextual information (such as the caller information) to 
 *   each log entry.
 * - Each of the logging methods (`error`, `warn`, `info`, `debug`, `trace`) formats the message using the `Message` class's 
 *   `getFormattedMessage` method and passes it to the corresponding `pino` log method.
 * 
 * This class abstracts the use of the `pino` logging library and provides a consistent interface for logging messages with 
 * various severity levels, as well as additional contextual information such as the caller details.
 */
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

    public tics(message: Message): void {
        //this.logger.tics(message.getFormattedMessage());
    }
}