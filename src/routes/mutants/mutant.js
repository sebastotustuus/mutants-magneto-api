const { dnaMiddlerware } = require('../../middleware/validations/mutant');

module.exports = (router, { mutantController }) => {
  router
    .post('/mutant', dnaMiddlerware, mutantController.isMutant)
    .get('/stats', mutantController.stats);

  return router;
};
