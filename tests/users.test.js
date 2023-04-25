const request = require('supertest');
const app = require('../src/app');

describe('GET /users', () => {
  it('respond with JSON array of users', async () => {
    const response = await request(app).get('/api/v1/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it('respond with a specific user', async () => {
    const response = await request(app).get('/api/v1/users/64473594e096e9cd7ce75ca7');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });

  it('respond with 500 if user is not found', async () => {
    const response = await request(app).get('/api/v1/users/659993734bbe096e9cd7ce75c9e');
    expect(response.statusCode).toBe(500);
  });

  // it('create a new user', async () => {
  //   const response = await request(app)
  //     .post('/api/v1/users')
  //     .send({
  //       name: 'Test User',
  //       email: 'test@mailer.com',
  //       password: 'password'
  //     });
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toEqual(expect.any(Object));
  // });

  // it('update a user', async () => {
  //   const response = await request(app)
  //     .put('/api/v1/users/6447dfdba97b315f9f408e4f')
  //     .send({
  //       name: 'Test User',
  //       email: 'tester@mail.com',
  //       password: 'password'
  //     });
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toEqual(expect.any(Object));
  // });
});
