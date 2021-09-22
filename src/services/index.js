const repositories = require('../dal');
const mutantService = require('./mutant');

module.exports = {
  mutantService: mutantService(repositories),
};
