const aggregateMock = require('./aggregate.mock')

module.exports = {
  aggregate: jest.fn().mockReturnValueOnce(aggregateMock),
  create: jest.fn().mockReturnValueOnce(true),
};
