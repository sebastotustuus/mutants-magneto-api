const { mutantService } = require('../services');
const mutantController = require('./controllers/mutant');

module.exports = {
  mutantController: mutantController(mutantService),
};
