const request = require('supertest'); // << install this as -D

const server = require('./server.js'); // << the System Under Test (SUT)

describe('server', () => {
  it('db environment set to development', () => {
    expect(process.env.DB_ENV).toBe('development');
  });

  // describe('GET /jokes', () => {
  //   it('should return 200 OK', () => {
  //     // rest client and make a get to '/', look at the status code
  //     return request(server)
  //       .get('/api/jokes')
  //       .then(res => {
  //         expect(res.status).toBe(200);
  //       });
  //   });
 
  // });

  describe('POST /register', () => {
    it('should return 201 OK', () => {
      return request(server)
        .post('/api/register')
        .send({username: "sam", password: "pass"}) // x-www-form-urlencoded upload
         .set('Accept', 'application/json')
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
 
  });

  describe('POST /login', () => {
    it('should return 200 OK', () => {
      return request(server)
        .post('/api/login')
        .send({username: "sam", password: "pass"}) // x-www-form-urlencoded upload
         .set('Accept', 'application/json')
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
 
  });
});