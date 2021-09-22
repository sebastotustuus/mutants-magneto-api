const { expectCt } = require('helmet');
const mutantHelpers = require('../../src/utils/mutant/helpers');

describe('Testing Mutant Helpers to get a DNA Mutant', () => {
  describe('Testing function findMutant', () => {
    it('Should return de right object', () => {
      const dna = ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'];
      const hashValues = { counterDna: 0 };
      const result = mutantHelpers.findDnaMutant({ dnaList: dna, hashValues });
      expect(result).toHaveProperty('00');
      expect(result).toHaveProperty('11');
      expect(result).toHaveProperty('22');
      expect(result).toHaveProperty('33');
    });

    it('Should return the counterDna equal 0', () => {
      const dna = ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'];
      const hashValues = { counterDna: 0 };
      const result = mutantHelpers.findDnaMutant({ dnaList: dna, hashValues });
      expect(result).toHaveProperty('counterDna');
      expect(result.counterDna).toBe(0);
    });

    it('Should return the counterDna equal 2', () => {
      const dna = ['ATGCGA', 'AAGTGA', 'ATATTA', 'AGACGA', 'GCGTCA', 'TCACTG'];
      const hashValues = { counterDna: 0 };
      const result = mutantHelpers.findDnaMutant({ dnaList: dna, hashValues });
      expect(result).toHaveProperty('counterDna');
      expect(result.counterDna).toBe(2);
    });

    it('Should return the counterDna equal 2', () => {
      const dna = ['TTGCGA', 'AGGTGT', 'TTATTA', 'AGAAGA', 'GCGTAA', 'TCACTA'];
      const hashValues = { counterDna: 0 };
      const result = mutantHelpers.findDnaMutant({ dnaList: dna, hashValues });
      expect(result).toHaveProperty('counterDna');
      expect(result.counterDna).toBe(2);
    });
  });
});
