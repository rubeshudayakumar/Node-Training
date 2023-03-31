const { createLogger, format, transports } = require('winston');
require("dotenv").config();

const errorLogger = createLogger({
    level: process.env.LOGGER_LEVEL_ERROR,
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
    level: process.env.LOGGER_LEVEL_WARNING,
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