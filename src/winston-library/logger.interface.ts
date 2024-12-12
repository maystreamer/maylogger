import { LoggerOptions } from 'pino'
import { LOG_LEVEL } from './logger.lib'

export interface IConfig {
   LOG_LEVEL: LOG_LEVEL
   SERVICE_NAME: string
}

export interface ILogger {
//   trace(message: string, ...args: any[]): void
//   trace(message: object): void
//   trace(message: Error): void

  debug(message: string, ...args: any[]): void
//   debug(message: object): void
//   debug(message: Error): void

  info(message: string, ...args: any[]): void
//   info(message: object): void
//   info(message: Error): void

  warn(message: string, ...args: any[]): void
//   warn(message: object): void
//   warn(message: Error): void

  error(message: string, ...args: any[]): void
  error(message: object): void
  error(message: Error): void

  fatal(message: string, ...args: any[]): void
  fatal(message: object): void
  fatal(message: Error): void
}

export type LoggerConfig = LoggerOptions
export type LoggerDependency = {
  loggerConfig: LoggerConfig
  appConfig: IConfig
}
