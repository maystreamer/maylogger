import { Message } from './message';

export interface ILogger {
  error(message : Message)  : void;
  warn (message : Message)  : void;
  info (message : Message)  : void;
  debug(message : Message)  : void;
  trace(message : Message)  : void;
}