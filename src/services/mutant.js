const { findDnaMutant } = require('../utils/mutant/helpers');
const { responseBasic } = require('../utils/responsesHelpers');

const isMutantService =
  (mutantRepository) =>
  async (dnaList) => {
    try {
      const hashValues = { counterDna: 0 };
      const { counterDna } = findDnaMutant({ dnaList, hashValues });
      const isMutant = counterDna >= 2;
      await mutantRepository.create(dnaList, isMutant);
      return responseBasic(isMutant);
    } catch (error) {
      return Promise.reject(error);
    }
  };

const statsService =
  (mutantRepository) =>
  async () => {
    try {
      return mutantRepository.get()
    } catch (error) {
      console.log(error);
    }
  };

module.exports = ({ mutantRepository }) => ({
  isMutant: isMutantService(mutantRepository),
  getStats: statsService(mutantRepository),
});
