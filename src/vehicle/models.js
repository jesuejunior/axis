const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
  vehicle: { type: String, required: true },
  brand: { type: String, required: true },
  sold: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },

}, { collection: 'vehicle' });

vehicleSchema.pre('save', function (next) {
  this.updated = Date.now;
  next();
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
