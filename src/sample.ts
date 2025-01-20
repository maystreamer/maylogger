// src/app.ts
import express, { Request, Response, NextFunction, Router } from 'express';
import { LoggerConfig, LogLevel } from './logger/logconfig';
import { configuration } from './config';
import { Logger } from './logger/logger';


const router = Router();
const config: LoggerConfig = {
    dir:                    configuration.logDir,
    appName:                configuration.appName,
    isDebugEnabled:         configuration.isDebugEnabled,
    isTicsEnabled:          configuration.isTicsEnabled,
    isErrorEnabled:         configuration.isErrorEnabled,          
    level:                  LogLevel.INFO,
    timestampFormat:        'yyyy-mm-dd hh:mm:ss.ms',
    customMessageFormat:    '{{timestamp}} {{level}} {{message}} {{caller}}'
};

// Initialize logger with 'winston' or 'pino'
const logger = new Logger('winston', config);

router.get('/', (req: Request, res: Response) => {
     const traceId = req.headers['x-trace-id'] || 'something wrong'

    logger.info(`This is an info message 2: ${config.timestampFormat}, traceId: ${traceId}`);
    
    res.json({ message: 'Welcome to the Express App!' });
});


const app = express();

// Middleware for JSON parsing
app.use(express.json());
app.use(logger.setTraceIdMiddleware())

// Routes
app.use('/', router);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


