/**
 * LogLevel Enum
 * 
 * Defines the available log levels for the logger. These levels represent the severity or importance of the 
 * log messages and can be used to filter log output based on the specified level.
 * 
 * - `DEBUG`: Represents detailed debugging information, typically used during development.
 * - `INFO` : Represents general informational messages about the application's normal operation.
 * - `WARN` : Represents warning messages indicating a potential issue that is not critical.
 * - `ERROR`: Represents error messages indicating that something has gone wrong in the application.
 */
export enum LogLevel {
    DEBUG   =   'debug',
    INFO    =   'info',
    WARN    =   'warn',
    ERROR   =   'error',
    TICS    =   'tics',
}

  // Define the color mapping for the custom levels
export const CustomLevels = {
    levels: {
      tics:     0, 
      fatal:    1,
      error:    2,
      warn:     3,
      info:     4,
      debug:    5,
      trace:    6 
    } as Record<string, number>,
    colors: {
      fatal:    'red',
      error:    'red',
      warn:     'yellow',
      info:     'green',
      debug:    'cyan',
      trace:    'magenta',
      tics:     'grey',
    },
  };

/**
 * LoggerConfig Interface
 * 
 * Defines the configuration options for the logger. This structure is used to configure the logger's 
 * behavior, including the log level, output directory, timestamp format, and custom message format.
 * 
 * - `dir`                  : Directory path where logs will be saved.
 * - `appName`              : Name of the application generating the logs.
 * - `isDebugEnabled`       : Flag indicating whether debug-level logs should be enabled.
 * - `level`                : Specifies the log level to be used for filtering log messages.
 * - `timestampFormat`      : Format string for the timestamp to be included in log entries.
 * - `customMessageFormat`  : Format string for customizing the structure of log messages.
 */ 
export interface LoggerConfig {
    dir                 :   string;
    appName             :   string;
    isDebugEnabled      :   boolean;
    level               :   LogLevel;
    datePattern?        :   string;
    maxSize?            :   string;  
    maxFiles?           :   string;
    isTicsEnabled?      :   boolean;
    isErrorEnabled?     :   boolean;  
    timestampFormat     :   string;
    customMessageFormat :   string;
}

/**
 * Default Logger Configuration
 * 
 * Provides the default configuration settings for the logger. These default values can be used if no
 * custom configuration is provided by the user.
 * 
 * - `dir`                  : Empty string, indicating no directory specified by default.
 * - `appName`              : Empty string, indicating no application name specified by default.
 * - `isDebugEnabled`       : `false`, meaning payload will be stringfied only for debug-level logs.
 * - `level`                : `LogLevel.INFO`, setting the default log level to `INFO`.
 * - `timestampFormat`      : `'yyyy-mm-dd hh:mm:ss.ms'`, default timestamp format for log entries.
 * - `customMessageFormat`  : `'{{timestamp}} {{level}} {{message}} {{caller}}'`, default log message format.
 */
export const defaultConfig: LoggerConfig = {
    dir                 :   '',
    appName             :   '',
    isDebugEnabled      :   false,
    level               :   LogLevel.INFO,
    datePattern         :   'YYYY-MM-DD',
    maxSize             :   '50m', 
    maxFiles            :   '15d',
    isTicsEnabled       :   false,
    isErrorEnabled      :   false,      
    timestampFormat     :   'yyyy-mm-dd hh:mm:ss.ms',
    customMessageFormat :   '{{timestamp}} {{level}} {{message}} {{caller}}'
};