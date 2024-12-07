export enum LogLevel {
    DEBUG   = 'debug',
    INFO    = 'info',
    WARN    = 'warn',
    ERROR   = 'error',
}

export interface LoggerConfig {
    dir                 :   string;
    appName             :   string;
    isDebugEnabled      :   boolean;
    level               :   LogLevel;
    timestampFormat     :   string;
    customMessageFormat :   string;
}

export const defaultConfig: LoggerConfig = {
    dir                 :   '',
    appName             :   '',
    isDebugEnabled      :   false,
    level               :   LogLevel.INFO,
    timestampFormat     :   'yyyy-mm-dd hh:mm:ss.ms',
    customMessageFormat :   '{{timestamp}} {{level}} {{message}} {{caller}}'
};