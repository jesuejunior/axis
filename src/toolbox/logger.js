const restify = require('restify');
const bunyan = require('bunyan');
const config = require('../config');

const stream = [
  {
    stream: process.stdout,
    level: 'debug',
  },
];
if (config.env === 'dev') {
  stream[0].level = 'trace';
}

const logger = bunyan.createLogger({
  name: 'Axis API',
  streams: stream,
  serializers: restify.bunyan.serializers.response,
});

module.exports = logger;
