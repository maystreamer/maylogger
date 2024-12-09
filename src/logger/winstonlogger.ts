import winston, { transports, format } from 'winston';
import 'winston-daily-rotate-file';
import { getFormattedDate} from './utils';
import { CustomLevels, LogLevel, LoggerConfig, defaultConfig } from './logconfig';
import { AbstractLogger } from './abstractlogger';
import DailyRotateFile from 'winston-daily-rotate-file';


/**
 * WinstonLogger Class
 * 
 * The `WinstonLogger` class implements the `ILogger` interface using the `winston` logging library. It provides logging functionality 
 * with multiple transports (console, file-based) and configurable log formats. This class supports logging messages at different 
 * levels (error, warn, info, debug, trace), and includes options for rotating log files and controlling the log output format.
 * 
 * - The constructor initializes the logger with configuration options, including setting up transport mechanisms for logging to 
 *   both console and file. The log level, log directory, and app name are customizable through the `LoggerConfig`. The file-based 
 *   logs are rotated daily and stored in separate files for different log levels (INFO and ERROR), with a max size of 50 MB per file 
 *   and a retention of 15 days.
 * 
 * - The `getFormatForConsole` and `getFormatForFile` methods define custom log formats for console and file outputs. The console logs 
 *   are colorized for easier reading, while the file logs include additional metadata such as container name and trace IDs.
 * 
 * - The `buildLog` method formats each log entry with a timestamp, application name, trace ID, log level, and the log message. This method 
 *   is used by both the console and file formats.
 * 
 * - The logging methods (`error`, `warn`, `info`, `debug`, `trace`) accept `Message` objects and log the formatted message with the 
 *   appropriate log level.
 * 
 * This class provides a robust logging solution that integrates well with the `winston` library, offering flexibility in log 
 * formatting, file rotation, and log level control, while ensuring rich contextual information is included in the logs.
 */
export class WinstonLogger extends AbstractLogger {
 
    constructor(config: LoggerConfig = defaultConfig) {
        super(config);

        let ticsFileRotateTransport: DailyRotateFile | undefined;
        let errorFileRotateTransport: DailyRotateFile | undefined;
        if(config.isTicsEnabled){
            ticsFileRotateTransport = new transports.DailyRotateFile({
                filename:       this.getLogFilePath(LogLevel.TICS),
                level:          LogLevel.TICS,
                datePattern:    config.datePattern,
                zippedArchive:  true,
                maxSize:        this.config.maxSize,
                maxFiles:       this.config.maxFiles,
                format:         this.getFormatForFile(this.appName)
            });
        }

        if(config.isErrorEnabled){
            errorFileRotateTransport = new transports.DailyRotateFile({
                filename:       this.getLogFilePath(LogLevel.ERROR),
                level:          LogLevel.ERROR,
                datePattern:    config.datePattern,
                zippedArchive:  true,
                maxSize:        this.config.maxSize,
                maxFiles:       this.config.maxFiles,
                format:         this.getFormatForFile(this.appName)
            });            
        }

        const infoFileRotateTransport = new transports.DailyRotateFile({
            filename:       this.getLogFilePath(LogLevel.INFO),
            level:          LogLevel.INFO,
            datePattern:    config.datePattern,
            zippedArchive:  true,
            maxSize:        this.config.maxSize,
            maxFiles:       this.config.maxFiles,
            format:         this.getFormatForFile(this.appName)
        });
        
        const consoleTransport = new transports.Console({
            format: this.getFormatForConsole(this.appName)
        });
        
        this.logger = winston.createLogger({
            levels:             CustomLevels.levels,
            level:              this.level || LogLevel.INFO,
            handleExceptions:   true,
            format:             winston.format.combine(
                                    winston.format.timestamp({ format: getFormattedDate() }),
                                    //customLogFormat
                                ),
            transports:         [
                                    infoFileRotateTransport,
                                    ...(errorFileRotateTransport ? [errorFileRotateTransport] : []), // Only add errorFileRotateTransport if it's defined
                                    ...(ticsFileRotateTransport ? [ticsFileRotateTransport] : []),   // Only add ticsFileRotateTransport if it's defined
                                    consoleTransport,
                                ],
        });
        winston.addColors(CustomLevels.colors);
    }

    getFormatForConsole(appName: string): winston.Logform.Format {
        return format.combine(
          format.printf(info => {
                return this.prepareLog(info, appName);
            }),
          format.colorize({all: true})
        );
    }

    getFormatForFile(appName: string): winston.Logform.Format {
        const containerName = process.env.CONTAINER_NAME || 'Unknown';
        return format.combine(
            winston.format.label({ label: containerName }),
            format.printf(info => {
                return this.prepareLog(info, appName);
            }));
    }

    prepareLog(info: winston.Logform.TransformableInfo, appName: string) {
        let message:    string  = info?.message as string;
        const args:     any[]   = Array.isArray(info[Symbol.for('splat')]) ? info[Symbol.for('splat')] as any[] : [];
        const traceId:  string  = args[0] || WinstonLogger.defaultTraceId;
        let level:      string  = info.level.trim().toUpperCase();
        level = level === 'ERROR' ? '[ERROR]' : `[${level}] `;
        //let formattedMessage = this.formatMessage(message, level, args);
        return this.buildLog(info.timestamp as string, appName, message, traceId, level);
    }
}