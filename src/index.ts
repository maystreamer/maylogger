import { Logger } from './logger/logger';
import { LogLevel, LoggerConfig } from './logger/logconfig';
import { configuration } from './config';
import { v4 as uuidv4 } from 'uuid';

/**
 * Logger Initialization and Example Usage
 * 
 * This section of the code initializes the logging configuration and demonstrates how to use the `Logger` class for logging at 
 * different levels (INFO, DEBUG, WARN, ERROR). The configuration object defines the settings for logging, such as the log 
 * directory, application name, debug flag, log level, timestamp format, and custom message format. 
 * 
 * The logger is instantiated with the type 'winston' and the provided configuration. This logger will handle logging messages 
 * with different levels, including information, debug, warning, and error messages.
 * 
 * The example function `exampleFunction` showcases various types of log messages, including:
 * 
 * - `info`: General information messages with placeholders for dynamic content (e.g., `traceId`, timestamp).
 * - `infoWithTime`: Info messages that include a time duration (calculated as the difference between the current time and a 
 *   start time).
 * - `debug`: Debugging messages for internal application flow.
 * - `warn`: Warning messages indicating non-critical issues.
 * - `error`: Error messages, including a stack trace and a specific error message.
 * 
 * The logger is used to log messages with various levels and includes dynamic data such as `traceId`, payloads, and timestamps. 
 * This demonstrates how the logger can be customized and utilized to capture important information in the application's execution.
 */
const config: LoggerConfig = {
    dir:                    configuration.logDir,
    appName:                configuration.appName,
    isDebugEnabled:         configuration.isDebugEnabled,
    isTicsEnabled:          configuration.isTicsEnabled,
    isErrorEnabled:         configuration.isErrorEnabled,          
    level:                  LogLevel.INFO,
    timestampFormat:        'yyyy-mm-dd hh:mm:ss.ms',
    customMessageFormat:    '{{timestamp}} {{level}} {{message}} {{caller}}'
};

// Initialize logger with 'winston' or 'pino'
const logger = new Logger('winston', config);

const payload  = { context: { user: 'john_doe', action: 'login' } }
const payload1 = { pages: { page: 'login', action: 'submit' } }

const traceId = uuidv4();
const start = new Date().getTime();
// Example function that logs messages at different levels
const exampleFunction = () => {
    logger.info('This is an info message {0} and {1}', traceId, config.timestampFormat, new Date());
    logger.infoWithTime('This is an info with time message {0} and {1} and took {2}', traceId, start, config.timestampFormat, new Date());
    logger.info(`This is an info message 2: ${config.timestampFormat}`, traceId);
    logger.info('This is a new info message {0} and number is {1}', traceId, payload, 1234567);
    logger.debug('This is a debug message {0}', traceId, payload);
    logger.warn('This is a warning message {0}', traceId, payload);
    logger.error(new Error("Error Occured"), "There is an error {0}", traceId, payload);
    logger.tics(`{0}`, traceId, config);
    logger.tics(`{0}`, traceId, payload1);
};

// Simulate application running
console.log('Application is starting...');
exampleFunction();