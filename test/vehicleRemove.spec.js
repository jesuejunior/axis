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

describe('Integration test Remove By Id', () => {
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


  describe('Removing vehicle', () => {
    beforeEach((done) => {
      Vehicle.remove({}).exec();
      car1._id = '5959b360def4235b602182a2';
      [car1, car2].forEach((data) => {
        const v = new Vehicle(data);
        v.save();
      });
      done();
    });
    // afterEach((done) => {
    //   Vehicle.remove({}).exec();
    //   done();
    // });
    it('should do a request with ID then doesnt found any vehicle to be removed', (done) => {
      request(server)
        .get('/veiculos/5959b360def4235b60218212')
        .expect('Content-Type', 'application/json')
        .expect(204, done());
    });

    it('should do a request then find by id and remove it', (done) => {
      Vehicle.count({}).exec((err, count) => {
        expect(count).to.equal(2);
        done();
      });

      request(server)
        .del('/veiculos/5959b360def4235b602182a2')
        .expect('Content-Type', 'application/json')
        .expect(204, done());

      Vehicle.count({}).exec((err, count) => {
        expect(count).to.equal(1);
        done();
      });
    });
  });
});
