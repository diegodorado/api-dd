const allowAnonymous = require('./hooks/allow-anonymous');
const { authenticate } = require('@feathersjs/authentication');

// Application hooks that run for every service

module.exports = {
  before: {
    all: [],
    //all: [ allowAnonymous()],
    //all: [ allowAnonymous(), authenticate('jwt', 'anonymous') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
