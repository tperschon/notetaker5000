// import express router
const api = require('express').Router();
// import route modules
const notes = require('./notes');
// assign route modules to router
api.use('/api', notes);
// export consolidated routes
module.exports = api;