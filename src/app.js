const restify = require('restify');
const config = require('./config');
const logger = require('./toolbox/logger');
const db = require('./database');
const VehicleService = require('./vehicle/services');
const registerVehicleHandlers = require('./vehicle/handlers');

const app = restify.createServer({
  name: 'Axis API',
  log: logger,
});

app.use(restify.acceptParser(app.acceptable));
app.use(restify.queryParser());
app.use(restify.jsonp());
app.use(restify.bodyParser({ mapParams: true }));
app.use(restify.CORS());
app.use(restify.requestLogger());
app.pre(restify.pre.sanitizePath());
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Accept', 'application/json');
  next();
});

// Configuring routes
const service = new VehicleService();
registerVehicleHandlers(app, service);

app.listen(config.port, () => {
  logger.info('Server started on port: ', config.port);
});

module.exports = app;
