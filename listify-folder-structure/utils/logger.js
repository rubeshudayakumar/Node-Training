const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: "error",
    transports:[
        new transports.File({
            filename: './logs/error.log',
            format: format.combine(
                format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        )}),
        new transports.File({
            level: "warn",
            filename: './logs/warn.log',
            format: format.combine(
                format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        )}),
    ]
        
});

module.exports = logger;