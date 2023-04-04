const { createLogger, format, transports } = require('winston');

const errorLogger = createLogger({
    level: "error",
    transports:
        new transports.File({
            filename: './logs/error.log',
            format: format.combine(
                format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        )}),
});

const warnLogger = createLogger({
    level: "warn",
    transports:
        new transports.File({
            filename: './logs/warn.log',
            format: format.combine(
                format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        )}),
});

module.exports = {
    errorLogger,
    warnLogger,
}