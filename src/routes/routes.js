const compression = require('compression');
const express = require('express');
const router = require('express').Router();
const cors = require('cors');
const helmet = require('helmet');

module.exports = (modules) => {
  // Middleware Routes
  router
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cors())
    .use(compression())
    .use(helmet());

  // Api Inyection
  router.use('/api', modules(router).mutantRouter);

  // Welcome Message
  router.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to Magneto API. The New Army of Magneto',
    });
  });

  return router;
};
