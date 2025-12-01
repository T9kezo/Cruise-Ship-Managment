const Logger = require('../js/logger.js');

describe('Logger', () => {
    let logger;

    beforeEach(() => {
        logger = new Logger();
    });

    test('should log info messages', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        logger.info('Test info message');
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('INFO'));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Test info message'));
        consoleSpy.mockRestore();
    });

    test('should log error messages', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        logger.error('Test error message');
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('ERROR'));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Test error message'));
        consoleSpy.mockRestore();
    });

    test('should include timestamp in logs', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        logger.info('Test');
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/));
        consoleSpy.mockRestore();
    });
});
