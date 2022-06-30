const notes = require('express').Router();
const path = require('path');
const fs = require('fs');
const { v4: uuid } = require('uuid');
// handle GET requests to /notes path, send them the notes.json
notes.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/notes.json'))
});

// handle POST requests to /notes path
notes.post('/notes', (req, res) => {
    // if there's a body
    if(req.body) {
        // if there's both a body title and body text
        if(req.body.title && req.body.text) {
            // create a new note object with given title and text as well as a UUID
            const newNote = {
                title: req.body.title,
                body: req.body.text,
                id: uuid()
            };
            // read the notes.json file
            fs.readFile(path.join(__dirname, '../db/notes.json'), 'utf8', (err, data) => {
                // if we get an error, log the error
                if (err) { console.error(err); }
                // otherwise, we continue
                else {
                    // turn our JSON into a JS object array we can use
                    const allNotes = JSON.parse(data);
                    // push the note to the array
                    allNotes.push(newNote);
                    // write the array back to the JSON we're reading, turning it into a nicely formatted string, logging an error if we encounter one
                    fs.writeFile(path.join(__dirname, '../db/notes.json'), JSON.stringify(allNotes, null, 4), err => { if(err) console.error(err) });
                };
            });
        }
        // since we don't have both, find out which we don't have and respond appropriately
        else {
            if(req.body.title) res.send('Body must have text.');
            if(req.body.text) res.send('Body must have title.');
        }
    }
    // since no body, give them back a message saying they need a body
    else res.send('POST request must contain body.');
});

notes.delete('/notes/:id', (req, res) => {
    console.log(req)
});

module.exports = notes;