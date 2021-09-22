/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

module.exports = {
  HOST: process.env.HOST,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
};
