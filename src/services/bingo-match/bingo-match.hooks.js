const { authenticate } = require("@feathersjs/authentication").hooks;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      async (context) => {
        context.data.createdAt = new Date();
        context.data.updatedAt = context.data.createdAt;
        return context;
      },
    ],
    update: [
      async (context) => {
        context.data.updatedAt = new Date();
        return context;
      },
    ],
    patch: [
      async (context) => {
        context.data.updatedAt = new Date();
        return context;
      },
    ],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
