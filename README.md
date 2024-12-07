# Logger Library

A flexible and configurable logging library for Node.js applications. This library supports both Winston and Pino loggers and allows developers to log messages at different levels. It also offers customizable message formats, timestamp formatting, and error stack trace logging.

## Features

- **Multiple log levels**: Log messages at different levels such as `info`, `warn`, `debug`, `error`, `trace`.
- **Customizable configuration**: Configure log directory, log levels, timestamp format, and message format.
- **Support for `Winston` and `Pino` loggers**: Switch between popular logging libraries as needed.
- **Error logging**: Automatically includes stack traces for error logs.
- **Debug mode**: Option to enable or disable debug-level logs depending on the environment.
- **Log file rotation**: Automatically rotates log files based on a daily schedule and file size.

## Installation

To install the logger library, use npm or yarn:

```bash
npm install logger-library
```

or

```bash
yarn add logger-library
```

## Configuration

The logger can be configured using environment variables or a custom configuration object. The available configuration options are as follows:

- `LOG_DIR`: The directory where log files will be stored (default: `logs`).
- `NODE_ENV`: The environment in which the application is running (`development`, `production`, `test`).
- `APP_NAME`: The name of the application (default: `no-app`).
- `IS_DEBUG_ENABLED`: Enable or disable Json.stringify for debug logging only (`true` or `false`).

Example `.env` file:

```bash
NODE_ENV=development
LOG_DIR=logs
CONTAINER_NAME=CONTAINER_NAME_123
APP_NAME=Sample App
IS_DEBUG_ENABLED=true
```

Alternatively, you can provide a custom configuration in your application code:

```typescript
import { Logger } from 'maylogger';
import { LoggerConfig, LogLevel } from 'maylogger/config';

const config: LoggerConfig = {
  dir: 'logs',
  appName: 'Sample App',
  isDebugEnabled: true,
  level: LogLevel.INFO,
  timestampFormat: 'yyyy-mm-dd hh:mm:ss.ms',
  customMessageFormat: '{{timestamp}} {{level}} {{message}} {{caller}}',
};

const logger = new Logger('winston', config);
```

## Example Usage

### 1. Initialize the Logger

```typescript
import { Logger } from 'maylogger';
import { LoggerConfig, LogLevel } from 'maylogger/config';

const config: LoggerConfig = {
  dir: 'logs',
  appName: 'Sample App',
  isDebugEnabled: true,
  level: LogLevel.INFO,
  timestampFormat: 'yyyy-mm-dd hh:mm:ss.ms',
  customMessageFormat: '{{timestamp}} {{level}} {{message}} {{caller}}',
};

const logger = new Logger('winston', config);
```

### 2. Log Messages

```typescript
import { Message } from 'maylogger/message';

const payload = { context: { user: 'john_doe', action: 'login' } }
const traceId = uuidv4();
const start = new Date().getTime();

const exampleFunction = () => {
    logger.info('This is an info message {0} and {1}', traceId, config.timestampFormat, new Date());
    logger.infoWithTime('This is an info with time message {0} and {1} and took {2}', traceId, start, config.timestampFormat, new Date());
    logger.info(`This is an info message 2: ${config.timestampFormat}`, traceId);
    logger.info('This is a new info message {0} and number is {1}', traceId, payload, 1234567);
    logger.debug('This is a debug message {0}', traceId, payload);
    logger.warn('This is a warning message {0}', traceId, payload);
    logger.error(new Error("Error Occured"), "There is an error {0}", traceId, payload);
};
exampleFunction();
```

### 3. Run the Application

To run the application, use the following command:

```bash
npx tsc
node dist/index.js
```

### 4. View the Logs

Logs will be saved in the specified log directory (`logs/` by default). The log files will be rotated daily and based on log level. 

Example log files:
- `logs/2024-12-07-info-sample app.log`
- `logs/2024-12-07-error-sample app.log`

## Log Output Example

Example of how logs might appear in the log files:

```bash
[2024-12-07 15:51:25.418] [sample app] [ba6e4893-1527-47ca-b118-55334c0bb3d1] [INFO]   This is an info message yyyy-mm-dd hh:mm:ss.ms and "2024-12-07T15:51:25.418Z"
[2024-12-07 15:51:25.418] [sample app] [ba6e4893-1527-47ca-b118-55334c0bb3d1] [INFO]   This is an info with time message yyyy-mm-dd hh:mm:ss.ms and "2024-12-07T15:51:25.419Z" and took 1 ms
[2024-12-07 15:51:25.418] [sample app] [ba6e4893-1527-47ca-b118-55334c0bb3d1] [INFO]   This is an info message 2: yyyy-mm-dd hh:mm:ss.ms
[2024-12-07 15:51:25.418] [sample app] [ba6e4893-1527-47ca-b118-55334c0bb3d1] [INFO]   This is a new info message {"context":{"user":"john_doe","action":"login"}} and number is 1234567
[2024-12-07 15:51:25.418] [sample app] [ba6e4893-1527-47ca-b118-55334c0bb3d1] [WARN]   This is a warning message {"context":{"user":"john_doe","action":"login"}}
[2024-12-07 15:51:25.418] [sample app] [ba6e4893-1527-47ca-b118-55334c0bb3d1] [ERROR]  There is an error {"context":{"user":"john_doe","action":"login"}}
Error: Error Occured
    at exampleFunction (/Users/user/Documents/maylogger/dist/index.js:28:18)
    at Object.<anonymous> (/Users/user/Documents/maylogger/dist/index.js:32:1)
    at Module._compile (node:internal/modules/cjs/loader:1256:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1310:10)
    at Module.load (node:internal/modules/cjs/loader:1119:32)
    at Module._load (node:internal/modules/cjs/loader:960:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:23:47
```

## Contributing

Contributions are welcome! If you find an issue or want to propose a new feature, feel free to open an issue or submit a pull request.

### Steps to contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a pull request

## License

This project is licensed under the Apache-2.0 license.