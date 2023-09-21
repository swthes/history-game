const request = require('supertest');
const app = require('./index'); 

describe('Server', () => {
  let server;

  beforeAll(() => {
    server = app.listen(); 
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should respond with "Example app listening" message', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Example app listening');
  });
});
