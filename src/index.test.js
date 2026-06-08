'use strict';

// Mock the app module before requiring the entry point
jest.mock('./app', () => ({
  listen: jest.fn()
}));

describe('index', () => {
  let consoleLogSpy;

  beforeAll(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleLogSpy.mockRestore();
  });

  afterEach(() => {
    // Reset all mocks and module cache to ensure isolation
    jest.resetModules();
    jest.clearAllMocks();
    delete process.env.PORT;
  });

  it('should start the server on default port 3000 when PORT env is not set', () => {
    delete process.env.PORT;
    require('./index');
    const app = require('./app');

    expect(app.listen).toHaveBeenCalledTimes(1);
    expect(app.listen).toHaveBeenCalledWith(3000, expect.any(Function));
  });

  it('should start the server on a custom port when PORT env is set', () => {
    process.env.PORT = '4000';
    require('./index');
    const app = require('./app');

    expect(app.listen).toHaveBeenCalledTimes(1);
    expect(app.listen).toHaveBeenCalledWith('4000', expect.any(Function));
  });

  it('should fall back to default port 3000 when PORT env is an empty string', () => {
    process.env.PORT = '';
    require('./index');
    const app = require('./app');

    expect(app.listen).toHaveBeenCalledTimes(1);
    expect(app.listen).toHaveBeenCalledWith(3000, expect.any(Function));
  });

  it('should log the correct message after the server starts', () => {
    delete process.env.PORT;
    require('./index');
    const app = require('./app');

    // Simulate the server start by invoking the listen callback
    const listenCallback = app.listen.mock.calls[0][1];
    listenCallback();

    expect(console.log).toHaveBeenCalledWith(
      `Health check service listening on port 3000`
    );
  });
});