/* global it */
/* global describe */
/* global beforeEach */
/* global afterEach */
/* "no-underscore-dangle": "error"*/

// tools dependecies
const expect = require('chai').expect;
const request = require('supertest');


// project dependencies
const server = require('../src/app');
const Vehicle = require('../src/vehicle/models');

describe('AXIS API find by a term tests', () => {
  const car1 = {
    brand: 'fiat',
    sold: false,
    vehicle: 'car1',
  };
  const car2 = {
    brand: 'fiat',
    sold: true,
    vehicle: 'car2',
  };
  const car4 = {
    brand: 'fiat',
    sold: false,
    vehicle: 'car2',
  };


  describe('Integration tests GET FIND', () => {
    beforeEach(() => {
      Vehicle.deleteMany({}).exec();
      [car1, car2].forEach((data) => {
        const v = new Vehicle(data);
        v.save();
      });
    });
    afterEach(() => {
      Vehicle.remove({}).exec();
    });
    it('should do a request then no found  vehicles', (done) => {
      request(server)
        .get('/veiculos/find?q=car3')
        .expect('Content-Type', 'application/json')
        .expect(204, done());
    });

    it('should do a request then find by CAR2 and return vehicles(3)', (done) => {
      [car1, car2, car4].forEach((data) => {
        const v = new Vehicle(data);
        v.save();
      });
      request(server)
        .get('/veiculos/find?q=car2')
        .expect('Content-Type', 'application/json')
        .expect(200)
        .end((err, response) => {
          expect(response.body.length).to.equal(3);
          done();
        });
    });
  });
});
