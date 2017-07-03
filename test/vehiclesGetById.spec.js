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

describe('Integration test Get By Id', () => {
  const car1 = {
    brand: 'fiat',
    sold: false,
    vehicle: 'uno',
  };
  const car2 = {
    brand: 'fiat',
    sold: true,
    vehicle: '147',
  };
  const car4 = {
    brand: 'fiat',
    sold: false,
    vehicle: 'toro',
  };


  describe('GET BY ID working', () => {
    beforeEach(() => {
      [car1, car2].forEach((data) => {
        const v = new Vehicle(data);
        v.save();
      });
    });
    afterEach(() => {
      Vehicle.remove({}).exec();
    });
    it('should do a request with ID then doesnt found any vehicle', (done) => {
      request(server)
        .get('/veiculos/5959b360def4235b60218212')
        .expect('Content-Type', 'application/json')
        .expect(204, done());
    });

    it('should do a request then find by id and return car1', (done) => {
      // FIXME: Add this exception to eslint
      car1._id = '5959b360def4235b602182a2';
      [car1, car2, car4].forEach((data) => {
        const v = new Vehicle(data);
        v.save();
      });
      request(server)
        .get('/veiculos/5959b360def4235b602182a2')
        .expect('Content-Type', 'application/json')
        .expect(200)
        .end((err, response) => {
          const v = response.body;
          expect(v._id).to.equal('5959b360def4235b602182a2');
          expect(v.brand).to.equal('fiat');
          expect(v.vehicle).to.equal('uno');
          done();
        });
    });
  });
});
