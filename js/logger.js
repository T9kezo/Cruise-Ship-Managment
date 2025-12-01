// Logging utility for the application
export class Logger {
    constructor() {
        this.logs = [];
    }

    formatTimestamp() {
        return new Date().toISOString();
    }

    info(message, data = null) {
        const logEntry = {
            timestamp: this.formatTimestamp(),
            level: 'INFO',
            message,
            data
        };
        this.logs.push(logEntry);
        console.log(`[${logEntry.timestamp}] [INFO] ${message}`, data || '');
        return logEntry;
    }

    error(message, error = null) {
        const logEntry = {
            timestamp: this.formatTimestamp(),
            level: 'ERROR',
            message,
            error: error ? error.toString() : null
        };
        this.logs.push(logEntry);
        console.error(`[${logEntry.timestamp}] [ERROR] ${message}`, error || '');
        return logEntry;
    }

    warn(message, data = null) {
        const logEntry = {
            timestamp: this.formatTimestamp(),
            level: 'WARN',
            message,
            data
        };
        this.logs.push(logEntry);
        console.warn(`[${logEntry.timestamp}] [WARN] ${message}`, data || '');
        return logEntry;
    }

    getLogs() {
        return this.logs;
    }

    clearLogs() {
        this.logs = [];
    }
}

// Export singleton instance
export const logger = new Logger();

