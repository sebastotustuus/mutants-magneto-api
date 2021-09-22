const { handleValidation } = require('../validate');
const { isMutantSchema } = require('../schemas/mutant');
const { validateStructureDna } = require('./custom/validateDna');

const dnaMiddlerware = [handleValidation(isMutantSchema), validateStructureDna];

module.exports = {
  dnaMiddlerware,
};
