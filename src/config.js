const config = {
  env: process.env.ENV || 'dev',
  port: +process.env.PORT || 8000,
  mongo: {
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: +process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || 'axis',
  },
};

module.exports = config;
