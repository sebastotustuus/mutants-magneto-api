const joi = require('joi');

const dnaSchema = joi.array().items(joi.string()).min(4).message({
  'array.min': `The dna array should has at least 4 items. This is because to calculate a mutant dna is neccesary calculate 4 consecutives expressions of dna`
});

const isMutantSchema = {
  dna: dnaSchema.required(),
};

module.exports = {
  isMutantSchema,
};
