'use strict';

const request = require('supertest');
const app = require('./app');

describe('GET /health', () => {
  test('should return 200 with status ok', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  test('should return 404 for POST method', async () => {
    await request(app)
      .post('/health')
      .expect(404);
  });

  test('should return 404 for unknown endpoint', async () => {
    await request(app)
      .get('/nonexistent')
      .expect(404);
  });
});