import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Sample Configuration module
 * 
 * This module loads environment variables using the `dotenv` library and defines a `configuration` object that holds key application 
 * configuration values. The values are either fetched from the environment variables or assigned default values if the environment 
 * variables are not set. The configuration values are as follows:
 * 
 * - `logDir`: Specifies the directory where log files will be stored. Defaults to "logs" if not set in the environment.
 * - `nodeEnv`: Defines the environment in which the application is running (e.g., 'development', 'production', or 'test'). It is 
 *   derived from the `NODE_ENV` environment variable.
 * - `appName`: The name of the application, retrieved from the `APP_NAME` environment variable, or defaults to "no-app" if not set.
 * - `isDebugEnabled`: A boolean flag indicating whether debug logging is enabled. This is determined by the `IS_DEBUG_ENABLED` 
 *   environment variable, which should be set to 'true' for debugging to be enabled.
 * 
 * This configuration object centralizes the application settings and provides a convenient way to manage environment-specific 
 * values.
 */
export const configuration = {
    logDir:         process.env.LOG_DIR as string | "logs",
    nodeEnv:        process.env.NODE_ENV as 'development' | 'production' | 'test',
    appName:        process.env.APP_NAME as string | "no-app",
    isDebugEnabled: process.env.IS_DEBUG_ENABLED?.toLowerCase() === 'true' || false,
};