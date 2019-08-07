const app = require('../../server.js');
const chai = require('./chai.setup');

module.exports = () => chai.request(app);

/*
To make request:
const server = require('../setup/server.setup');
const res = await app.get('/);
*/
