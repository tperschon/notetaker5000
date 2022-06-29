const notes = require('express').Router();
const path = require('path');

notes.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/notes.json'))
});

notes.post('/notes', (req, res) => {

});

notes.delete('/notes/:id', (req, res) => {

});

module.exports = notes;