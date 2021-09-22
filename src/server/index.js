const { getConnection } = require('../config/connection');
const startup = require('./startup');
const server = require('./server');
const apiRoutes = require('../routes/routes');

/** Middelwares */
const middelwares = require('../middleware/handleErrors');

/** Routes */
const routes = require('../routes');

const routerApi = apiRoutes(routes);

const serverApi = server(routerApi, middelwares, getConnection);

const app = startup(serverApi);

module.exports = app;
