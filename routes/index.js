// import express router
const api = require('express').Router();
// import route modules
const notes = require('./notes');
const consolidation = require('./consolidation');
// assign route modules to router
api.use('/api', notes);
api.use('/api', consolidation);
// export consolidated routes
module.exports = api;