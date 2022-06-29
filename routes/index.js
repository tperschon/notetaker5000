const api = require('express').Router();

const notes = require('./notes');

api.use('/api', notes);

module.exports = api;