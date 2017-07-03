/* global it */
/* global describe */
/* global beforeEach */
/* "no-underscore-dangle": "error"*/

// tools dependecies
const expect = require('chai').expect;
const request = require('supertest');


// project dependencies
const server = require('../src/app');
const Vehicle = require('../src/vehicle/models');

describe('AXIS API tests', () => {
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
  describe('Integration tests GET ALL', () => {
    beforeEach(() => {
    // clean database
      Vehicle.deleteMany({}).exec();
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

  describe('Integration tests GET FIND', () => {
    beforeEach(() => {
    // clean database
      Vehicle.deleteMany({}).exec();
      [car1, car2].forEach((data) => {
        const v = new Vehicle(data);
        v.save();
      });
    });
    it('should do a request then no found  vehicles', (done) => {
      request(server)
        .get('/veiculos/find?q=car3')
        .expect('Content-Type', 'application/json')
        .expect(204, done());
    });

    it('shoud do a request then find by CAR2 and return vehicles(3)', (done) => {
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

  describe('Integration tests GET FIND', () => {
    beforeEach(() => {
    // clean database
      Vehicle.deleteMany({}).exec();
      [car1, car2].forEach((data) => {
        const v = new Vehicle(data);
        v.save();
      });
    });
    it('should do a request with ID then no found vehicle', (done) => {
      request(server)
        .get('/veiculos/5959b360def4235b60218212')
        .expect('Content-Type', 'application/json')
        .expect(204, done());
    });

    it('shoud do a request then find by id and return car1', (done) => {
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
          console.log(response);
          const v = response.body;
          expect(v._id).to.equal('5959b360def4235b602182a2');
          expect(v.brand).to.equal('fiat');
          expect(v.vehicle).to.equal('car1');
          done();
        });
    });
  });
});
