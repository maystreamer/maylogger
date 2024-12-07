import { Logger } from './logger/logger';
import { LogLevel, LoggerConfig } from './logger/logconfig';
import { configuration } from './config';
import { v4 as uuidv4 } from 'uuid';

const config: LoggerConfig = {
    dir:                    configuration.logDir,
    appName:                configuration.appName,
    isDebugEnabled:         configuration.isDebugEnabled,
    level:                  LogLevel.INFO,
    timestampFormat:        'yyyy-mm-dd hh:mm:ss.ms',
    customMessageFormat:    '{{timestamp}} {{level}} {{message}} {{caller}}'
};

// Initialize logger with 'winston' or 'pino'
const logger = new Logger('winston', config);

const payload = { context: { user: 'john_doe', action: 'login' } }
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
};

// Simulate application running
console.log('Application is starting...');
exampleFunction();