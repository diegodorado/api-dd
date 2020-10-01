const app = require('../../src/app');

describe('\'quotes\' service', () => {
  it('registered the service', () => {
    const service = app.service('quotes');
    expect(service).toBeTruthy();
  });
});
