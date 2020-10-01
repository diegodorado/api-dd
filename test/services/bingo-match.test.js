const app = require('../../src/app');

describe('\'bingo-match\' service', () => {
  it('registered the service', () => {
    const service = app.service('bingo-match');
    expect(service).toBeTruthy();
  });
});
