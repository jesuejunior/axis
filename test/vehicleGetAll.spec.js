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

describe('Integration tests Get All', () => {
  const car1 = {
    brand: 'fiat',
    sold: false,
    vehicle: 'siena',
  };
  const car2 = {
    brand: 'fiat',
    sold: true,
    vehicle: 'argo',
  };

  describe('Trying get all vehicles :)', () => {
    beforeEach(() => {
    // cleaning database
      Vehicle.remove({}).exec();
    });
    afterEach(() => {
    // cleaning database
      Vehicle.remove({}).exec();
    });

    it('should do a request then get no vehicles', (done) => {
      request(server)
        .get('/veiculos')
        .expect('Content-Type', 'application/json')
        .expect(204, done());
    });

    it('shoud do a request then get all vehicles(2)', (done) => {
      [car1, car2].forEach((data) => {
        const v = new Vehicle(data);
        v.save();
      });
      request(server)
        .get('/veiculos')
        .expect('Content-Type', 'application/json')
        .expect(200)
        .end((err, response) => {
          expect(response.body.length).to.equal(2);
          done();
        });
    });
  });
});
