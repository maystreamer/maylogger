import { Logger } from './logger/logger';
import { LogLevel, LoggerConfig } from './logger/config';

const config: LoggerConfig = {
    appName: "Sample-App",
    level: LogLevel.INFO,
    isDebugEnabled: true,
    timestampFormat: 'yyyy-mm-dd hh:mm:ss.ms',
    customMessageFormat: '{{timestamp}} {{level}} {{message}} {{caller}}'
};

// Initialize logger with 'winston' or 'pino'
const logger = new Logger('winston', config);

const payload = { context: { user: 'john_doe', action: 'login' } }

// Example function that logs messages at different levels
const exampleFunction = () => {
    logger.info('This is an info message {0} and {1}', config.timestampFormat, new Date());
    logger.info(`This is an info message 2: ${config.timestampFormat}`);
    logger.info('This is a new info message {0} and number is {1}', payload, 1234567);
    logger.debug('This is a debug message');
    logger.warn('This is a warning message');
    logger.error('This is an error message', new Error("Error Occured"));
    logger.fatal('This is a fatal error message');
};

// Simulate application running
console.log('Application is starting...');
exampleFunction();