const winston = require('winston');
const expressWinston = require('express-winston');

const logFilePath = process.env.LOG_FILE_PATH || 'logs';
const requestLogFileName = process.env.REQUEST_LOG_FILE_NAME || 'request.log';
const errorLogFileName = process.env.ERROR_LOG_FILE_NAME || 'error.log';

const logFormat = winston.format.json();
const transports = [
  new winston.transports.File({ filename: `${logFilePath}/${requestLogFileName}` }),
];

const requestLogger = expressWinston.logger({
  transports,
  format: logFormat,
});

transports.push(new winston.transports.File({ filename: `${logFilePath}/${errorLogFileName}` }));

const errorLogger = expressWinston.errorLogger({
  transports,
  format: logFormat,
});

module.exports = {
  requestLogger,
  errorLogger,
};
