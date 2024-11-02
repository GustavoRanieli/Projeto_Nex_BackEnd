const winston = require('winston');

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3, 
    http: 4
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "white",
    http: "magenta"
};
winston.addColors(colors);

const formats = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        ( info ) => `${info.timestamp} - ${info.level} - ${info.message}`
    )
);

const transport = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: `${__dirname}/logs/error.log`,
        level: "error"
    }),
    new winston.transports.File({
        filename: `${__dirname}/logs/info.log`
    })
];

const logger = winston.createLogger({
    levels : levels,
    level: 'info',
    format : formats,  
    transports : transport
})

module.exports = logger
