const { statsDto } = require('../Dto/stats.dto');

const create = (db) => async (dna, isMutant) => {
 try {
  return await db.create({ dna: JSON.stringify(dna), isMutant });
 } catch (error) {
   return Promise.reject(error)
 }
};

const getStats = (db) => async () => {
  const stats = await db.aggregate([{ $group: { _id: { type: '$isMutant' }, count: { $sum: 1 } } }]);
  return statsDto(stats)
};

module.exports = (db) => ({
  create: create(db),
  get: getStats(db),
});

