const app = require('express')();
const { PORT } = require('../config');

const errorhandlers = (middlewares) => {
    // Catch 404 Error
    app.use(middlewares.notFoundHandler);

    // Catch Middlewares Errors
    app.use(middlewares.logErrors);
    app.use(middlewares.wrapErrors);
    app.use(middlewares.errorHandler);
};

const server = (router, middlewares, connectionMongo) => {
  app.use(router);
  errorhandlers(middlewares);
  return {
    start() {
      return new Promise((resolve) => {
        app.listen(PORT, () => {
          console.log('Server on port:', PORT);
          resolve();
        });
      });
    },

    start_test() {
      return app;
    },

    startConnection() {
      return connectionMongo();
    },
  };
};

module.exports = server;
