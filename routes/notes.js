const notes = require('express').Router();
const path = require('path');
const fs = require('fs');

notes.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/notes.json'))
});

notes.post('/notes', (req, res) => {
    if(req.body) {
        if(req.body.title && req.body.text) {
            let notesJson = require('../db/notes.json');
            let newNote = {
                title: req.body.title,
                text: req.body.text
            };
            notesJson.push(newNote);
            fs.writeFileSync(path.join(__dirname, '../db/notes.json'), JSON.stringify(notesJson, null, 4));
        }
        else {
            if(req.body.title) res.send('Body must have text.');
            if(req.body.text) res.send('Body must have title.');
        }
    }
    else res.send('POST request must contain body.');
});

notes.delete('/notes/:id', (req, res) => {

});

module.exports = notes;