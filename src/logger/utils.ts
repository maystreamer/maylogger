import * as path from 'path';

/**
 * Utility Functions for Logging and Date-Time Management
 * 
 * This module provides a set of utility functions used for logging
 */
export const getFormattedDate = (): string => {
    // yyyy-mm-dd hh:mm:ss.ms
    return new Date().toISOString().replace('T', ' ').slice(0, 23);
};

export const getDateTimeDiff = (start: number): string => {
    const dateTimeDiff = Date.now() - start;
    return `${dateTimeDiff} ms`;
};

export const getCallerInfo = (): string => {
    const stack = new Error().stack;
    if (!stack) return '';
    const callerLine = stack.split('\n')[3]; // Skip first three lines to get the correct caller
    const match = callerLine?.match(/at\s+(.+?):(\d+):\d+/);
    if (match) {
        const filePath = match[1];
        const line = match[2];
        const fileName = path.basename(filePath);
        return `${fileName}:${line}`;
    }
    return '';
};

export const getSubString = (input: string, noOfChars: number): string => input.slice(0, noOfChars);