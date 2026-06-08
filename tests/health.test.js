'use strict';

const request = require('supertest');
const app = require('../src/app');

describe('GET /health', () => {
  it('returns status 200 and JSON body with status ok', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
