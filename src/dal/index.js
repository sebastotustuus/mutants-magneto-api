const mutantRepository = require('./repositories/mutant.repository');
const { NODE_ENV } = require('../config');
let models = require('./models/mutant');


if (NODE_ENV.trim() == 'staging') {
  models = require('../../__test__/__mock__/model.mock');
}

module.exports = {
  mutantRepository: mutantRepository(models),
};
