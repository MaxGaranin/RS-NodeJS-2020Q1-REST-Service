const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'debug',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: './logs/error.log',
      maxsize: 5242880, // 5MB
      tailable: true,
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

module.exports = logger;
