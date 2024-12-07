import * as dotenv from 'dotenv';
dotenv.config();

export const configuration = {
    logDir:         process.env.LOG_DIR as string | "logs",
    nodeEnv:        process.env.NODE_ENV as 'development' | 'production' | 'test',
    appName:        process.env.APP_NAME as string | "no-app",
    isDebugEnabled: process.env.IS_DEBUG_ENABLED?.toLowerCase() === 'true' || false,
};