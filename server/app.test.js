//const request = require('jest-each').default;
const request = require('supertest');
const app = require('./app');

describe('Express App', () => {
    it('should respond with questions at /home', async () => {
      const response = await request(app).get('/home');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(require('./history.json'));
    });
  
    it('should respond with Tudor questions at /home/tudors', async () => {
      const response = await request(app).get('/home/tudors');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(require('./history.json').tudorQuestions);
    });
  
    it('should respond with Viking questions at /home/viking', async () => {
      const response = await request(app).get('/home/viking');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(require('./history.json').VikingQuestions);
    });
  
    it('should respond with a welcome message at /', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Welcome to the quiz-history API!');
    });
  });