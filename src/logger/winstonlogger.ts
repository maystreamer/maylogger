import winston, { Logger, transports, createLogger, format } from 'winston';
import 'winston-daily-rotate-file';
import { ILogger } from './ilogger';
import { getFormattedDate, getCallerInfo } from './utils';
import { LogLevel, LoggerConfig, defaultConfig } from './config';
import * as path from 'path';

export class WinstonLogger implements ILogger {
    private logger: winston.Logger;
    private config: LoggerConfig;
 
    constructor(config: LoggerConfig = defaultConfig) {
        this.config = { ...defaultConfig, ...config };

        // Define the log file path where rotated files will be stored
        const logDir = path.join(__dirname, 'logs');
        const level  = this.config.level.trim().toLowerCase();
        const appName = this.config.appName.trim().toLowerCase();

        // Ensure the log directory exists (could add logic here if needed)
        //fs.mkdirSync(logDir, { recursive: true });
        const infoFileRotateTransport = new transports.DailyRotateFile({
            filename: path.join(logDir, `%DATE%-${LogLevel.INFO}-${appName}.log`),
            level: LogLevel.INFO,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '50m',
            maxFiles: '15d',
            format: this.getFormatForFile()
          });

        const errorFileRotateTransport = new transports.DailyRotateFile({
            filename: path.join(logDir, `%DATE%-${LogLevel.ERROR}-${appName}.log`),
            level: LogLevel.ERROR,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '50m',
            maxFiles: '15d',
            format: this.getFormatForFile()
          });  
        
        const formatTimestamp = () => {
            return new Date().toISOString().replace('T', ' ').slice(0, 23); // yyyy-mm-dd hh:mm:ss.ms
        };
        
        // Define the custom log format
        const customLogFormat = winston.format.printf(({ timestamp, level, message, stack }) => {
            // Padding for log level and message
            const paddedLevel = level.padEnd(7); // Pad level to 7 characters
            const paddedMessage = (message as string).padEnd(50); // Pad message to 50 characters
            // Return formatted string
            return `${timestamp} ${paddedLevel} ${paddedMessage.trim()} ${stack || ''}`;
        });
        
        this.logger = winston.createLogger({
            level: level || 'info',
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.timestamp({ format: formatTimestamp }),
                customLogFormat
            ),
            transports: [
                infoFileRotateTransport,
                errorFileRotateTransport,
                new transports.Console({
                    format: this.getFormatForConsole()
                }),
            ],
        });
    }

    getFormatForConsole(): winston.Logform.Format {
        return format.combine(
          format.timestamp(),
          format.printf(info => {
                return this.buildLog(info);
            }),
          format.colorize({all: true})
        );
    }

    buildLog(info: winston.Logform.TransformableInfo) {
        let message: string = info?.message as string;
        const args: any[] = Array.isArray(info[Symbol.for('splat')]) ? info[Symbol.for('splat')] as any[] : [];
        // Check for dynamic arguments and replace placeholders
        let formattedMessage = this.formatMessage(message, args);
        return `[${info.timestamp}] [${info.level.toUpperCase()}] ${formattedMessage}`;
    }

    getFormatForFile(): winston.Logform.Format {
        return format.combine(
            format.timestamp(),
            format.printf(info => {
                return this.buildLog(info);
            }));
    }

    // Method to handle dynamic arguments and string formatting
    formatMessage(message: string, args: any[]): string {
        args.forEach((arg, index) => {
            const placeholder = `{${index}}`;
            if(typeof arg === 'object'){
                arg = JSON.stringify(arg);
            }
            message = message.replace(placeholder, arg);
          });
          return message;
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
        this.logger.error(`FATAL: ${message}`, ...meta);
    }
}