// Initializes the `bingo-match` service on path `/bingo-match`
const { BingoMatch } = require('./bingo-match.class');
const createModel = require('../../models/bingo-match.model');
const hooks = require('./bingo-match.hooks');

class ChatService {
  constructor() {
    this.events = ['msg']
  }
  setup(app) {
    this.app = app;
  }
  async patch(id, params) {
    this.emit('msg', params)
    return params
  }
}


class BallsService {
  setup(app) {
    this.app = app;
  }
  async patch(id, params) {
    const service = this.app.service('bingo-match');
    const m = await service.get(id)
    const balls = [params.ball,...m.balls]
    const p = await service.patch(id,{...m,balls})
    return p
  }
}


module.exports = function (app) {
  const options = {
    events: ['balls'],
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/bingo-match', new BingoMatch(options, app))
  app.use('/bingo-balls', new BallsService())
  app.use('/bingo-chat', new ChatService())

  // Get our initialized service so that we can register hooks
  const service = app.service('bingo-match');

  service.on('created', (message, context) => console.log('created', message))
  service.on('patched', (message, context) => {
    const data = {type:'customEvent',data: 'anything'}
    service.emit('balls', data)
  })

  service.publish('patched', () => app.channel('anonymous'))
  service.publish('balls', () => app.channel('anonymous'))
  app.service('bingo-chat').publish('msg', () => app.channel('anonymous'))

  service.hooks(hooks);
};
