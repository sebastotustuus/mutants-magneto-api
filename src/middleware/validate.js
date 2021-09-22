const joi = require('joi');
const boom = require('@hapi/boom');

const validateData = (data, schema) => {
  const { error } = joi.object(schema).validate(data);
  return error;
};

exports.handleValidation =
  (schema, check = 'body') =>
  (req, res, next) => {
    const error = validateData(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
  };
