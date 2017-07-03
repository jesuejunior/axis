const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./toolbox/logger');

mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.database}`, (err) => {
  if (err) {
    logger.error('EError on trying connection', err);
  }
});

mongoose.connection.on('connected', () => {
  logger.info('Mongoose default connection opened');
});

mongoose.connection.on('error', (err) => {
  logger.error(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  logger.error('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.error('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

mongoose.Promise = Promise;


require('./vehicle/models');
