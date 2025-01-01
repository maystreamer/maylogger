import { LoggerConfig } from './logconfig';
import { LoggerFactory } from './loggerfactory';
import { Message } from './message';
import { TraceLogger } from './traceLogger';
import { getDateTimeDiff } from './utils';

/**
 * Logger Class
 * 
 * The `Logger` class provides a structured interface for logging messages at different severity levels
 * (error, warn, info, debug, trace). It uses an instance of `ILogger` to handle the actual logging functionality,
 * allowing for flexible logging configurations and message formatting. This class supports both basic and time-sensitive
 * log messages, where time-based logs include the time elapsed since a specified start time.
 * 
 * The class defines methods for each log level that accept a message, trace ID, optional parameters, and in some cases,
 * a start time for calculating elapsed time. Each method constructs a `Message` object before passing it to the logger instance.
 * 
 * - The `Logger` is initialized with a `type` (which may represent the category of the logger) and a `config` that specifies 
 *   the logging configuration (e.g., log level, timestamp format, etc.).
 * - The `error`, `warn`, `info`, `debug`, and `trace` methods log messages with or without timing information.
 * - Each method constructs a `Message` object using static methods from the `Message` class (e.g., `msg`, `msgWithCause`), which encapsulate 
 *   the log message, optional parameters, and other contextual information such as the trace ID or elapsed time.
 * 
 * This class relies on the `LoggerFactory` to create an appropriate logger instance based on the configuration provided.
 */
export class Logger extends TraceLogger{
    private logger: any;

    constructor(private type: string, private config: LoggerConfig) {
        super()
        this.logger = LoggerFactory.getLogger(type, config);
    }

    public error(cause: Error, message: string, traceId?: string, ...params: any[]): void {
        const msg = Message.msgWithCause(cause, message, traceId, ...params);
        this.logger.error(msg);
    }

    public errorWithTime(cause: Error, message: string, start: number, traceId?: string, ...params: any[]): void {
        const msg = Message.msgWithCause(cause, message, traceId, ...params, getDateTimeDiff(start));
        this.logger.error(msg);
    }

    public warn(message: string, traceId?: string, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params);
        this.logger.warn(msg);
    }

    public warnWithTime(message: string,start: number,traceId?: string, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params, getDateTimeDiff(start));
        this.logger.warn(msg);
    }

    public info(message: string, traceId?: string, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params);
        this.logger.info(msg);
    }

    public infoWithTime(message: string, start: number, traceId?: string, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params, getDateTimeDiff(start));
        this.logger.info(msg);
    }

    public debug(message: string, traceId?: string, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params);
        this.logger.debug(msg);
    }

    public debugWithTime(message: string, start: number, traceId?: string, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params, getDateTimeDiff(start));
        this.logger.debug(msg);
    }

    public trace(message: string, traceId?: string, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params);
        this.logger.trace(msg);
    }

    public tics(message: string, traceId?: string, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params);
        this.logger.tics(msg);
    }

    public ticsWithTime(message: string, start: number, traceId?: string, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params, getDateTimeDiff(start));
        this.logger.tics(msg);
    }
}