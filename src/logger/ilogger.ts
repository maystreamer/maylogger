import { Message } from './message';

/**
 * ILogger Interface
 * 
 * This interface defines the methods required for any logging implementation. It specifies five logging
 * levels: `error`, `warn`, `info`, `debug`, and `trace`, each of which accepts a `Message` object. 
 * 
 * - `error(message: Message)`: Logs an error message, typically for issues that require attention.
 * - `warn(message: Message)` : Logs a warning message, generally used for non-critical issues that may require monitoring.
 * - `info(message: Message)` : Logs an informational message, commonly used to record standard application operations.
 * - `debug(message: Message)`: Logs a detailed message for debugging purposes, useful for development and troubleshooting.
 * - `trace(message: Message)`: Logs the most granular level of detail, typically used for in-depth tracking of application behavior.
 * 
 * The `Message` object, which is passed to each method, contains the content of the log message along with any associated
 * data, such as parameters or error details.
 */
export interface ILogger {
  error(message : Message)  : void;
  warn (message : Message)  : void;
  info (message : Message)  : void;
  debug(message : Message)  : void;
  trace(message : Message)  : void;
  tics (message : Message)  : void;
}