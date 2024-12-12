import pino from 'pino'
import winston from 'winston'
import { ILogger, LoggerConfig } from './logger.interface'


export enum LOG_LEVEL {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal'
}

let appLogger: ILogger | null = null
export class WinstonLogger implements ILogger {
  private readonly logger: winston.Logger

  constructor(config: LoggerConfig = {}) {
    this.logger = winston.createLogger(config)
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
    if(typeof message === 'object' && message instanceof Error){
        this.logger.error(message)
    } else if(typeof message === 'object' ){
        this.logger.error(message)
    } else{
        this.logger.error(message, ...args)
    }
  }

  fatal(message: string | object | Error, ...args: any[]) {
    if(typeof message === 'object' && message instanceof Error){
        this.logger.error(message)
    } else if(typeof message === 'object' ){
        this.logger.error(message)
    } else{
        this.logger.error(message, ...args)
    }
  }
}



// export const createAppLogger = ({
//   loggerConfig,
//   appConfig
// }: LoggerDependency): ILogger => {
//   const serviceName = appConfig.SERVICE_NAME
//   const logLevel = appConfig.LOG_LEVEL

//   appLogger = new PinoLogger({
//     level: logLevel || LOG_LEVEL.INFO,
//     name: serviceName ? `${serviceName}-logger` : 'app-logger',
//     transport: {
//       targets:[
//       {
//         target: 'pino-pretty',
//         options: {
//         colorize: true,
//         translateTime: 'SYS:standard',
//         levelFirst: true,
//         ignore: 'pid,hostname',
//         singleLine: true
//         }
//       },
//       { target: 'pino/file', options: { destination: './logs/output.log', mkdir:true}},
//     ]
//     },
//     ...loggerConfig
//   })

//   return appLogger
// }

