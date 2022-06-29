const router = require('express').Router();

const notes = require('./notes');

router.use('/api', notes);

module.exports = router;