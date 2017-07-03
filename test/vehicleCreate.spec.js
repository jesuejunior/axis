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

describe('Integration Test Create', () => {
  const car1 = {
    brand: 'chery',
    sold: false,
    vehicle: 'qq',
  };
  const car2 = {
    brand: 'fiat',
    sold: true,
    vehicle: 'palio',
  };
  const car5 = {
    sold: false,
    vehicle: 'car2',
  };

  describe('New Vehicle', () => {
    beforeEach('Creating two vehicles before', () => {
      [car1, car2].forEach((data) => {
        const v = new Vehicle(data);
        v.save();
      });
    });
    afterEach('Cleaning the database', () => {
      Vehicle.remove({}).exec();
    });

    it('should do a request with missing required params', (done) => {
      request(server)
        .post('/veiculos')
        .send(car5)
        .expect('Content-Type', 'application/json')
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('Vehicle validation failed: brand: Path `brand` is required.');
          done();
        });
    });

    it('should do a request then create a new vehicle', (done) => {
      Vehicle.count({}).exec((err, count) => {
        console.log('$$$$$$$$$$$$$', count);
        expect(count).to.equal(2);
      });

      request(server)
        .post('/veiculos')
        .send(car1)
        .expect('Content-Type', 'application/json')
        .expect(201)
        .end(() => {
          Vehicle.findOne(car1).exec().then((v) => {
            expect(v.brand).to.equal('chery');
            expect(v.vehicle).to.equal('qq');
          });

          // Vehicle.count().exec((r) => {
          //   expect(r).to.equal(2);
          // });
          done();
        });
    });
  });
});
