const { AuthenticationBaseStrategy, AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');

class AnonymousStrategy extends AuthenticationBaseStrategy {
  async authenticate(authentication, params) {
    return {
      ...authentication,
      anonymous: true
    }
  }
}

class MyAuthService extends AuthenticationService {
  async getPayload(authResult, params) {
    // Call original `getPayload` first
    const payload = await super.getPayload(authResult, params);
    const { user } = authResult;

    if (user && user.permissions) {
      payload.permissions = user.permissions;
    }

    return {...payload, ...authResult}
  }
}


module.exports = app => {
  //const authentication = new AuthenticationService(app);
  const authentication = new MyAuthService(app)

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('anonymous', new AnonymousStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
