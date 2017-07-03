const logger = require('../toolbox/logger');
const Vehicle = require('./models');

class VehicleService {
  getAll() {
    logger.info('Getting all vehicles');
    return Vehicle.find().lean().exec();
  }

  create(data) {
    const vehicle = new Vehicle(data);
    return vehicle.save();
  }

  findById(id) {
    const vehicle = Vehicle.findById(id).lean().exec();
    return vehicle;
  }
  search(param) {
    const vehicles = Vehicle.where('vehicle').equals(param).exec();
    return vehicles;
  }

  remove(id) {
    const vehicle = Vehicle.findByIdAndRemove(id).exec();
    return vehicle;
  }

  update(id, data) {
    const vehicle = Vehicle.findOneAndUpdate(id, data).exec();
    return vehicle;
  }
}

module.exports = VehicleService;
