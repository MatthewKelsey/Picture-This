const request = require('supertest');
const app = require('../index'); 
const User = require('../Models/userSchema');
const bcrypt = require('bcrypt');

describe('User Controller', () => {
  let testUser = {firstName: 'Test', lastName:'User', email: 'test@test.com', password:'test'}



  afterAll(async () => {
    // Clean up and delete the test user
    await User.findOneAndDelete({ email: 'test@test.com' });
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/register')
        .send(
        testUser
        );

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('email', 'test@test.com');
    });

    it('should return 409 if user already exists', async () => {
      const response = await request(app)
        .post('/register')
        .send(testUser);

      expect(response.status).toBe(409);
    });

    it('should return 400 if password is empty', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          email: 'empty@example.com',
          password: '',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /login', () => {
    it('should log in an existing user', async () => {
      const response = await request(app)
        .post('/login')
        .send(testUser);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('email', 'test@test.com');
  
    });

    it('should return 401 if email and/or password is incorrect', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'test@test.com',
          password: 'incorrectpassword',
        });

      expect(response.status).toBe(401);
    
    });
  });

  
});
