const {
  calulateLastValue,
  getLastRowKey,
  getLastUpColumn,
  getLastUpRigthKey,
  getLastUpLeftKey,
  key
} = require('../../src/utils/mutant/lambdas');
const dnaMock = require('../__mock__/dnaList.mock');

describe('Mutant Lambdas Unit Testing', () => {
  describe('Lambda Calculate Value', () => {
    it('Should return the number 1', () => {
      const beforeChar = 'A';
      const currentChar = 'C';
      const currentValue = 0;
      const expectedValue = calulateLastValue(beforeChar, currentChar, currentValue);
      expect(expectedValue).toBe(1);
    });

    it('Should incremente the current value in + 1', () => {
      const beforeChar = 'A';
      const currentChar = 'A';
      const currentValue = 1;
      const expectedValue = calulateLastValue(beforeChar, currentChar, currentValue);
      expect(expectedValue).toBe(currentValue + 1);
    });
  });

  describe('Lambda getLastRowKey', () => {
    it('Should return the first value of the hash', () => {
      const returnKey = ({ modifyRow = 1, modifyColumn = 0 } = {}) => `${1 + modifyRow}${0 + modifyColumn}`;
      const expectedHash = getLastRowKey(dnaMock, returnKey);
      expect(expectedHash).toMatchObject(dnaMock['00']);
    });
  });

  describe('Lambda getLastUpColumn', () => {
    it('Should return the first value in the position 1:0', () => {
      const returnKey = ({ modifyRow = 0, modifyColumn = -1 } = {}) => `${1 + modifyRow}${1 + modifyColumn}`;
      const expectedHash = getLastUpColumn(dnaMock, returnKey);
      expect(expectedHash).toMatchObject(dnaMock['10']);
    });
  });

  describe('Lambda getLastUpRigthKey', () => {
    it('Should return the first value in the position 0:1', () => {
      const returnKey = ({ modifyRow = -1, modifyColumn = 1 } = {}) => `${1 + modifyRow}${0 + modifyColumn}`;
      const expectedHash = getLastUpRigthKey(dnaMock, returnKey);
      expect(expectedHash).toMatchObject(dnaMock['01']);
    });

    it('Should return the a empty Object', () => {
        const returnKey = ({ modifyRow = -1, modifyColumn = 1 } = {}) => `${1 + modifyRow}${5 + modifyColumn}`;
        const expectedHash = getLastUpRigthKey(dnaMock, returnKey);
        expect(expectedHash).toMatchObject({});
      });
  });

  describe('Lambda getLastUpLeftKey', () => {
    it('Should return the first value in the position 0:0', () => {
      const returnKey = ({ modifyRow = -1, modifyColumn = -1 } = {}) => `${1 + modifyRow}${1 + modifyColumn}`;
      const expectedHash = getLastUpLeftKey(dnaMock, returnKey);
      expect(expectedHash).toMatchObject(dnaMock['00']);
    });
  });

  describe('Lambda key', () => {
    it('Should return the current value 0:0', () => {
      const expectedHash = key({indexRow: 0, indexColumn: 0})()
      expect(expectedHash).toBe('00');
    });

    it('Should return the key modified 10 -> 00', () => {
        const expectedHash = key({indexRow: 1, indexColumn: 0})({modifyRow: -1})
        expect(expectedHash).toBe('00');
      });

      it('Should return the NaN concatened', () => {
        const expectedHash = key()()
        expect(expectedHash).toBe('NaNNaN');
      });
  });
});
