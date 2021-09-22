const isMutant = (mutantService) => async (req, res, next) => {
  try {
    const { dna } = req.body;
    const result = await mutantService.isMutant(dna);
    res.status(result.status).json(result);
    return;
  } catch (error) {
    next(error);
  }
};

const stats = (mutantService) => async (req, res, next) => {
  try {
    const stats = await mutantService.getStats()
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

module.exports = (services) => ({
  isMutant: isMutant(services),
  stats: stats(services),
});
