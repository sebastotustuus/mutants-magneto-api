exports.validateStructureDna = (req, res, next) => {
  const { dna } = req.body;
  const maxLength = dna.length;
  const validateDnaSize = dna.every((data) => data.length == maxLength);
  if (!validateDnaSize) {
    return res
      .status(403)
      .json({
        statusCode: 403,
        error: 'Forbidden',
        message: `The Array does't correspond with a Matrix NxN Schema. It isn't a Square matrix.`,
      });
  }
  next();
};
