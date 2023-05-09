const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/users");

jest.mock("../src/models/users", () => ({
  save: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn()
}));

describe("Users Service", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of users', async () => {
    const users = [
      { _id: '123', name: 'John Smith', email: 'john@example.com', password: 'password' },
      { _id: '456', name: 'Jane Doe', email: 'jane@example.com', password: 'password' },
    ]
    User.find.mockResolvedValue(users);
    const response = await request(app).get('/api/v1/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(users);
    expect(response.body[0]._id).toEqual("123");
  });

  it('should return a specific user from the id passed in', async () => {
    const user = { _id: '123', name: 'John Smith', email: 'john@example.com', password: 'password' }
  
    User.findById.mockResolvedValue(user);
    const response = await request(app).get(`/api/v1/users/123`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(user);
    expect(response.body.name).toEqual("John Smith");
  });
});




// describe("GET /users", () => {
//   it("should return all the users", async () => {
//     const result = await request(app).get('/api/v1/users');
//     expect(result.status).toBe(200);
//     expect(result.body).toEqual(expect.any(Array));
//   });

//   it("should return a specific user", async () => {
//     const result = await request(app).get('/api/v1/users/5e9d7d3c3b0e8e2d6c2d1c2e');
//     expect(result.status).toBe(200);
//     expect(result.body).toEqual(expect.any(Object));
//   });

//   it("should return 500 when the functions fails", async () => {
//     const result = await request(app).get('/api/v1/users/6448161c130ab4f72ebaffkjbjkfbjbf');
//     expect(result.status).toBe(500);
//   });
// });