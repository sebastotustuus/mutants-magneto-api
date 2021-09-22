const boom = require('@hapi/boom');

exports.logErrors = (err, req, res, next) => {
  next(err);
};

exports.errorHandler = (err, req, res, next) => {
  const { output } = err;
  return res.status(output.statusCode).json({ error: output });
};

exports.wrapErrors = (err, req, res, next) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
};

exports.notFoundHandler = (req, res) => {
  const {
    output: { statusCode, payload },
  } = boom.notFound();
  payload.message = 'Resource not found. Contact the administrator';
  res.status(statusCode).json(payload);
};