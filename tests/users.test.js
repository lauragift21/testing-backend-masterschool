const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/users');

jest.mock('../src/models/users', () => ({
  save: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe('Users controller', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // describe('POST /users', () => {
  //   it('creates a new user', async () => {
  //     User.save.mockResolvedValue({ _id: '123', name: 'John Smith', email: 'john@example.com' });
  //     const user = { name: 'John Smith', email: 'john@example.com', password: 'password' };
  //     const response = await request(app).post('/api/v1/users').send(user);
  //     expect(response.status).toBe(200);
  //     expect(response.body._id).toBe('123');
  //     expect(response.body.name).toBe(user.name);
  //     expect(response.body.email).toBe(user.email);
  //     expect(response.body.password).toBeUndefined();
  //     expect(User.save).toHaveBeenCalledTimes(1);
  //     expect(User.save).toHaveBeenCalledWith(user);
  //   });
  // });

  describe('GET /users', () => {
    it('returns a list of users', async () => {
      const users = [
        { _id: '123', name: 'John Smith', email: 'john@example.com', password: 'password' },
        { _id: '456', name: 'Jane Doe', email: 'jane@example.com', password: 'password' },
      ];
      User.find.mockResolvedValue(users);
      const response = await request(app).get('/api/v1/users');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(users.length);
      response.body.forEach((user, index) => {
        expect(user._id).toBe(users[index]._id);
        expect(user.name).toBe(users[index].name);
        expect(user.email).toBe(users[index].email);
        expect(user.password).toBe(users[index].password);
      });
      expect(User.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /users/:id', () => {
    it('returns a specific user by ID', async () => {
      const user = { _id: 'abc', name: 'John Smith', email: 'john@example.com', password: 'password' };
      User.findById.mockResolvedValue(user);
      const response = await request(app).get(`/api/v1/users/${user._id}`);
      expect(response.status).toBe(200);
      expect(response.body._id).toBe(user._id);
      expect(response.body.name).toBe(user.name);
      expect(response.body.email).toBe(user.email);
      expect(response.body.password).toBe(user.password);
      expect(User.findById).toHaveBeenCalledTimes(1);
      expect(User.findById).toHaveBeenCalledWith(user._id);
    });
  });

  describe('PUT /users/:id', () => {
    it('updates a specific user by ID', async () => {
      const user = { _id: '123', name: 'John Smith', email: 'password' };
      User.findByIdAndUpdate.mockResolvedValue(user);
      const response = await request(app).put(`/api/v1/users/${user._id}`).send(user);
      expect(response.status).toBe(200);
      expect(response.body._id).toBe(user._id);
      expect(response.body.name).toBe(user.name);
      expect(response.body.email).toBe(user.email);
      expect(response.body.password).toBe(user.password);
      expect(User.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE /users/:id', () => {
    it('deletes a specific user by ID', async () => {
      const user = { _id: '123', name: 'John Smith', email: 'john@example.com', password: 'password' };
      User.findByIdAndDelete.mockResolvedValue(user._id);
      const response = await request(app).delete(`/api/v1/users/${user._id}`);
      expect(response.status).toBe(200);
    });
  });
});
