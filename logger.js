const { createLogger, format, transports } = require('winston');

// Setup Winston Logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json() // JSON format for Loki/Promtail
  ),
  transports: [
    new transports.Console(), // Logs to console
    new transports.File({ filename: 'app.log' }), // Logs to file
  ],
});

module.exports = logger;
