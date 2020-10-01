const users = require('./users/users.service.js');
const bingoMatch = require('./bingo-match/bingo-match.service.js');
const quotes = require('./quotes/quotes.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(bingoMatch);
  app.configure(quotes);
};
