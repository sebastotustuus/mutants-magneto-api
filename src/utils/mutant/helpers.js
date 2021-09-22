const { firstParameters } = require('../constants');
const {
  getLastRowKey,
  getLastUpRigthKey,
  calulateLastValue,
  getLastUpColumn,
  getLastUpLeftKey,
  key,
} = require('./lambdas');

const getCounterDnaMutant = (properties, counter = 0, count = 0) => {
  const counterResult = properties[count] >= 4 ? counter + 1 : counter;
  return count < properties.length - 1 ? getCounterDnaMutant(properties, counterResult, ++count) : counterResult;
};

const setCounterDnaMutant = (hash, firstProperty, secondProperty) => ({
  counterDnaMutant: getCounterDnaMutant([firstProperty, secondProperty]),
});

const getValuesUpAndRight = (char, indexRow, hash, keyIndex) => {
  const { char: beforeCharColum, lastColumnValue: beforLastColumnValue } =
    indexRow > 0 ? getLastRowKey(hash, keyIndex) : {};

  const beforeUpRigthInfo = indexRow > 0 ? getLastUpRigthKey(hash, keyIndex) : {};
  const { char: beforCharUpRigth, lastDiagonalUpRightValue: beforUpRigthValue } = beforeUpRigthInfo;

  const lastColumnValue = beforeCharColum ? calulateLastValue(beforeCharColum, char, beforLastColumnValue) : 1;
  const lastDiagonalUpRightValue = beforCharUpRigth ? calulateLastValue(beforCharUpRigth, char, beforUpRigthValue) : 1;

  const { counterDnaMutant } = setCounterDnaMutant(hash, lastColumnValue, lastDiagonalUpRightValue);
  return {
    lastColumnValue,
    lastDiagonalUpRightValue,
    ...({ counterDnaMutant }),
  };
};

const setInitialParameters = (char, indexColumn, indexRow, hash) => {
  const keyIndex = key({ indexRow, indexColumn });
  const a = {
    [`${keyIndex()}`]: {
      ...firstParameters,
      ...getValuesUpAndRight(char, indexRow, hash, keyIndex),
      char,
    },
  };
  return a;
};

const setAllValues = (currentChar, indexRow, indexColumn, hash) => {
  const keyIndex = key({ indexRow, indexColumn });
  const beforeColumnChartInfo = getLastUpColumn(hash, keyIndex);
  const beforeCharUpLeftInfo = indexRow > 0 ? getLastUpLeftKey(hash, keyIndex) : {};

  const { char: beforeChar, lastRowValue: hashLastRowValue } = beforeColumnChartInfo;
  const { char: beforeCharUpLeft, lastDiagonalUpLeftValue: beforeValueUpLeft } = beforeCharUpLeftInfo;

  const lastRowValue = calulateLastValue(beforeChar, currentChar, hashLastRowValue);
  const lastDiagonalUpLeftValue =
    indexRow > 0 && beforeCharUpLeft ? calulateLastValue(beforeCharUpLeft, currentChar, beforeValueUpLeft) : 1;
  const { counterDnaMutant } = setCounterDnaMutant(hash, lastRowValue, lastDiagonalUpLeftValue);
  const valuesUpAndRight = getValuesUpAndRight(currentChar, indexRow, hash, keyIndex)
  const counter = valuesUpAndRight.counterDnaMutant + counterDnaMutant
  return {
    [`${keyIndex()}`]: {
      ...getValuesUpAndRight(currentChar, indexRow, hash, keyIndex),
      char: currentChar,
      lastRowValue,
      lastDiagonalUpLeftValue,
      ...({ counterDnaMutant: counter }),
    },
  };
};

const findDnaMutant = ({ dnaList, indexRow = 0, indexColumn = 0, hashValues }) => {
  const maxLength = dnaList.length - 1;
  const validateIndexColumn = indexColumn === maxLength;
  const value = dnaList[indexRow][indexColumn];

  hashValues = {
    ...hashValues,
    ...(indexColumn === 0
      ? setInitialParameters(value, indexColumn, indexRow, hashValues)
      : setAllValues(value, indexRow, indexColumn, hashValues)),
    maxLength,
  };
  hashValues.counterDna += hashValues[key({ indexRow, indexColumn })()].counterDnaMutant;
  indexRow = validateIndexColumn ? indexRow + 1 : indexRow;
  indexColumn = validateIndexColumn ? 0 : indexColumn + 1;

  hashValues =
    indexRow <= maxLength && hashValues.counterDna < 2
      ? findDnaMutant({
          dnaList,
          indexRow,
          indexColumn,
          hashValues,
        })
      : hashValues;
  return hashValues;
};

module.exports = {
  findDnaMutant,
  setAllValues,
  setInitialParameters,
  getValuesUpAndRight,
  setCounterDnaMutant,
  getCounterDnaMutant,
};
