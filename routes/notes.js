const notes = require('express').Router();
const path = require('path');
const fs = require('fs');
const { v4: uuid } = require('uuid');

notes.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/notes.json'))
});

notes.post('/notes', (req, res) => {
    if(req.body) {
        if(req.body.title && req.body.text) {
            const newNote = {
                title: req.body.title,
                body: req.body.text,
                id: uuid()
            };
            fs.readFile(path.join(__dirname, '../db/notes.json'), 'utf8', (err, data) => {
              if (err) {console.error(err); }
              else {
                const allNotes = JSON.parse(data);
                allNotes.push(newNote);
                fs.writeFile(path.join(__dirname, '../db/notes.json'), JSON.stringify(allNotes, null, 4), err => { if(err) console.error(err) });
              };
            });
            // let notesJson = require('../db/notes.json');
            // let newNote = {
            //     title: req.body.title,
            //     text: req.body.text,
            //     id: uuid()
            // };
            // notesJson.push(newNote);
            // fs.writeFileSync(path.join(__dirname, '../db/notes.json'), JSON.stringify(notesJson, null, 4));
        }
        else {
            if(req.body.title) res.send('Body must have text.');
            if(req.body.text) res.send('Body must have title.');
        }
    }
    else res.send('POST request must contain body.');
});

notes.delete('/notes/:id', (req, res) => {
    console.log(req)
});

module.exports = notes;