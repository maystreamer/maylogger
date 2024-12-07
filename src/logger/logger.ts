import { ILogger } from './ilogger';
import { LoggerConfig } from './logconfig';
import { LoggerFactory } from './loggerfactory';
import { Message } from './message';
import { getDateTimeDiff } from './utils';

export class Logger {
    private logger: ILogger;

    constructor(private type: string, private config: LoggerConfig) {
        this.logger = LoggerFactory.getLogger(type, config);
    }

    public error(cause: Error, message: string, traceId: string, ...params: any[]): void {
        const msg = Message.msgWithCause(cause, message, traceId, ...params);
        this.logger.error(msg);
    }

    public errorWithTime(cause: Error, message: string, traceId: string, start: number, ...params: any[]): void {
        const msg = Message.msgWithCause(cause, message, traceId, ...params, getDateTimeDiff(start));
        this.logger.error(msg);
    }

    public warn(message: string, traceId: string, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params);
        this.logger.warn(msg);
    }

    public warnWithTime(message: string, traceId: string, start: number, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params, getDateTimeDiff(start));
        this.logger.warn(msg);
    }

    public info(message: string, traceId: string, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params);
        this.logger.info(msg);
    }

    public infoWithTime(message: string, traceId: string, start: number, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params, getDateTimeDiff(start));
        this.logger.info(msg);
    }

    public debug(message: string, traceId: string, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params);
        this.logger.debug(msg);
    }

    public debugWithTime(message: string, traceId: string, start: number, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params, getDateTimeDiff(start));
        this.logger.debug(msg);
    }

    public trace(message: string, traceId: string, ...params: any[]): void {
        const msg = Message.msg(message, traceId, ...params);
        this.logger.trace(msg);
    }
}