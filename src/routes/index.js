const mutantRouter = require('./mutants/mutant');
const controllers = require('../modules');

module.exports = (router) => ({
  mutantRouter: mutantRouter(router, controllers),
});
