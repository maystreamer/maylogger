export enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

export interface LoggerConfig {
    appName: String;
    level: LogLevel;
    isDebugEnabled: boolean;
    timestampFormat: string;
    customMessageFormat: string;
}

export const defaultConfig: LoggerConfig = {
    appName: '',
    level: LogLevel.INFO,
    isDebugEnabled: false,
    timestampFormat: 'yyyy-mm-dd hh:mm:ss.ms',
    customMessageFormat: '{{timestamp}} {{level}} {{message}} {{caller}}'
};