const { Service } = require('feathers-nedb');

exports.BingoMatch = class BingoMatch extends Service {
  
  async addBall(id, params) {
    console.log(id, params)
  }

};
