import {createAppLogger} from './src/logger-library'
import { LOG_LEVEL } from './src/logger-library'


const sampleLogger = createAppLogger({
    loggerConfig: {},
    appConfig: {
       LOG_LEVEL: LOG_LEVEL.TRACE,
       SERVICE_NAME:"integration-service"
    }
})

const obj = {
    error: "error",
    logLevel: "high"
}


sampleLogger.trace("this is a trace")
sampleLogger.debug("this is a debug log")
sampleLogger.info("this is a info log")
sampleLogger.warn("this is a warn log")
sampleLogger.error(new Error("this is a error log"))
sampleLogger.error("simple error log")
sampleLogger.fatal(new Error("this is a fatal log"))
