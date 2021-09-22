exports.statsDto = (stats) => {
  const parsedStats = stats
    .map(({ _id, count }) => {
      return {
        isMutant: _id.type,
        count,
      };
    })
    .reduce(
      (accum, data) => {
        accum = {
          ...accum,
          count_mutant_dna: data.isMutant ? data.count : accum.count_mutant_dna,
          count_human_dna: data.isMutant ? accum.count_human_dna : data.count,
        };
        return accum;
      },
      { count_mutant_dna: 0, count_human_dna: 0 },
    );
  return {
    ...parsedStats,
    ratio: Math.round((parsedStats.count_mutant_dna / parsedStats.count_human_dna) * 100) / 100,
  };
};
