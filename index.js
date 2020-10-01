const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')
const NeDB = require('nedb')
const service = require('feathers-nedb')
const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');

const db = new NeDB({
  filename: './db-data/messages',
  autoload: true
})

// Create an Express compatible Feathers application instance.
const app = express(feathers())
// Turn on JSON parser for REST services
app.use(express.json())
// Turn on URL-encoded parser for REST services
app.use(express.urlencoded({extended: true}))
// Enable REST services
app.configure(express.rest())
// Enable Socket.io services
app.configure(socketio())


class MyAuthService extends AuthenticationService {
  async getPayload(authResult, params) {
    // Call original `getPayload` first
    const payload = await super.getPayload(authResult, params);
    const { user } = authResult;

    if (user && user.permissions) {
      payload.permissions = user.permissions;
    }

    return payload;
  }
}

app.use('/authentication', new MyAuthService(app));


// Connect to the db, create and register a Feathers service.
app.use('/messages', service({
  Model: db,
  paginate: {
    default: 50,
    max: 100
  }
}))


app.use('/info', {
  async find() {
    return {
      services: Object.keys(app.services)
    }
  }
})

app.on('connection', connection => {
  // On a new real-time connection, add it to the
  // anonymous channel
  console.log('new conenction', connection)
  app.channel('anonymous').join(connection)
})

app.on('disconnect', connection => {
  console.log('disconnected', connection)
  app.channel('anonymous').join(connection);
});

// Set up default error handler
app.use(express.errorHandler());

// Start the server.
const port = process.env.PORT || 3000


app.listen(port, () => {
  console.log(`Feathers server listening on port ${port}`);
});
