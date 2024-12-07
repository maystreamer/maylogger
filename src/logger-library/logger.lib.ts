import pino from 'pino'
import { ILogger, LoggerConfig, LoggerDependency } from './logger.interface'


export enum LOG_LEVEL {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal'
}

let appLogger: ILogger | null = null
export class PinoLogger implements ILogger {
  private readonly logger: pino.Logger

  constructor(config: LoggerConfig = {}) {
    this.logger = pino(config)
  }

  trace(message: string, ...args: any[]) {
    this.logger.trace(message, ...args)
  }

  debug(message: string, ...args: any[]) {
    this.logger.debug(message, ...args)
  }

  info(message: string, ...args: any[]) {
    this.logger.info(message, ...args)
  }

  warn(message: string, ...args: any[]) {
    this.logger.warn(message, ...args)
  }

  error(message: string | object | Error, ...args: any[]) {
    this.logger.error(message, ...args)
  }

  fatal(message: string | object | Error, ...args: any[]) {
    this.logger.fatal(message, ...args)
  }
}

class ConsoleLogger implements ILogger {
  trace(message: string | object | Error, ...args: any[]) {
    console.trace(message, ...args)
  }

  debug(message: string | object | Error, ...args: any[]) {
    console.debug(message, ...args)
  }

  info(message: string | object | Error, ...args: any[]) {
    console.info(message, ...args)
  }

  warn(message: string | object | Error, ...args: any[]) {
    console.warn(message, ...args)
  }

  error(message: string | object | Error, ...args: any[]) {
    console.error(message, ...args)
  }

  fatal(message: string | object | Error, ...args: any[]) {
    console.error(message, ...args)
  }
}

const createConsoleLogger = (): ILogger => {
  return new ConsoleLogger()
} 

export const createAppLogger = ({
  loggerConfig,
  appConfig
}: LoggerDependency): ILogger => {
  const serviceName = appConfig.SERVICE_NAME
  const logLevel = appConfig.LOG_LEVEL

  appLogger = new PinoLogger({
    level: logLevel || LOG_LEVEL.INFO,
    name: serviceName ? `${serviceName}-logger` : 'app-logger',
    transport: {
      targets:[
      {
        target: 'pino-pretty',
        options: {
        colorize: true,
        translateTime: 'SYS:standard',
        levelFirst: true,
        ignore: 'pid,hostname',
        singleLine: true
        }
      },
      { target: 'pino/file', options: { destination: './logs/output.log', mkdir:true}},
    ]
    },
    ...loggerConfig
  })

  return appLogger
}



export const consoleLogger = createConsoleLogger()
export const getDefaultLogger = () => appLogger || consoleLogger
