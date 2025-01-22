import { ILogger } from './ilogger';
import { LoggerConfig, defaultConfig } from './logconfig';
import { Message } from './message';
import * as path from 'path';
import { TraceLogger } from './traceLogger';

/**
 * AbstractLogger Class
 * 
 * A base class for implementing custom loggers. It defines the structure and common behavior for loggers, including 
 * the buildLog method, which is used to format log entries consistently across different transports.
 */
export abstract class AbstractLogger extends TraceLogger implements ILogger {
    private logDir:     string;
    protected config:   LoggerConfig;
    protected logger:   any;
    protected level:    string;
    protected appName:  string;    
    protected static defaultTraceId = 'd25ed3cc-3d61-412b-82aa-dummytraceid';
    
    /**
     * Constructor that initializes the config property.
     * @param config Logger configuration
     */
    constructor(config: LoggerConfig) {
        super()
        this.config    =    { ...defaultConfig, ...config };
        this.logDir    =    (this.config.dir ? this.config.dir.toLowerCase() : __dirname) as string;
        this.level     =    this.config.level.trim().toLowerCase();
        this.appName   =    this.config.appName.trim().toLowerCase();
    }

    /**
     * Builds a structured log message including timestamp, application name, trace ID, log level, and message.
     * @param info Log information object
     * @param appName The application name
     */
    protected buildLog(timestamp: string, appName: string, message: string, traceId: string, level: string): string {
        let _level: string = level.trim().toUpperCase();
        _level = _level === 'ERROR' ? '[ERROR]' : `[${_level}]`;
        return `[${timestamp}] [${appName}] [${traceId}] ${level}  ${message}`;
    }

    protected getLogFilePath(loglevel: string){
        return path.join(this.logDir, `%DATE%-${loglevel}-${this.appName}.log`)
    }

    public error(message: Message): void {
        this.logger.error(message.getFormattedMessage(), this.getTraceId());
    }

    public warn(message: Message): void {
        this.logger.warn(message.getFormattedMessage(), this.getTraceId());
    }

    public info(message: Message): void {
        this.logger.info(message.getFormattedMessage(), this.getTraceId());
    }

    public debug(message: Message): void {
        this.logger.debug(message.getFormattedMessage(), this.getTraceId());
    }

    public trace(message: Message): void {
        this.logger.verbose(message.getFormattedMessage(), this.getTraceId());
    }

    // Add the new custom level "tics"
    public tics(message: Message): void {
        this.logger.tics(message.getFormattedMessage());
    }
}