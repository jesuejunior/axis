const Router = require('restify-router').Router;
const logger = require('../toolbox/logger');

const registerRoutes = (app, service) => {
  const handler = new Router();

  handler.get('/veiculos', (req, res, next) => {
    service.getAll().then((vehicles) => {
      if (vehicles.length) { res.send(200, vehicles); } else { res.send(204); }
    });
    next();
  });

  handler.get('/veiculos/find/', (req, res, next) => {
    service.search(req.params.q).then((result) => {
      if (result.length) { res.send(200, result); } else { res.send(204); }
    }).catch((err) => { logger.error(err); });
    next();
  });

  handler.get('/veiculos/:id', (req, res, next) => {
    service.findById(req.params.id).then((vehicle) => {
      if (vehicle) { res.send(200, vehicle); } else { res.send(204); }
    }).catch((error) => {
      logger.error(error);
      res.send(400);
    });
    next();
  });

  handler.post('/veiculos', (req, res, next) => {
    service.create(req.body).then((response) => {
      logger.info('Vehicle was created', response);
      res.send(201);
    }).catch((onReject) => {
      res.send(400, { message: onReject.message });
    });
    next();
  });

  // FIXME: It wasnt tested
  handler.put('/veiculos/:id', (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    service.update(id, body).then((result) => {
      logger.info(`Updating vehicle id: ${id}`, result);
      res.send(204);
    });
    next();
  });
  // FIXME: It wasnt tested
  handler.patch('/veiculos/:id', (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    service.update(id, body).then((result) => {
      logger.info(`Updating vehicle id: ${id}`, result);
      res.send(204);
    });
    next();
  });

  handler.del('/veiculos/:id', (req, res, next) => {
    const id = req.params.id;
    service.remove(id).then((result) => {
      logger.info('Vehicle has been deleted', result);
      res.send(204);
    }).catch((err) => {
      logger.error('A error ocurred', err);
    });

    next();
  });


  handler.applyRoutes(app);
};

module.exports = registerRoutes;
