// import dependencies
const notes = require('express').Router();
const p  = require('path');
const path = p.join(__dirname, '../db/notes.json');
const fs = require('fs');
const { v4: uuid } = require('uuid');

// handle GET requests to /notes path, send them the notes.json
notes.get('/notes', (req, res) => {
    res.sendFile(path);
});

// handle POST requests to /notes path
notes.post('/notes', (req, res) => {
    // if there's a body
    if (req.body) {
        // if there's both a body title and body text
        if (req.body.title && req.body.text) {
            // create a new note object with given title and text as well as a UUID
            const newNote = {
                title: req.body.title,
                body: req.body.text,
                id: uuid()
            };
            // read the notes.json file
            fs.readFile(path, 'utf8', (err, data) => {
                // if we get an error, log the error
                if (err) { console.error(err); }
                // otherwise, we continue
                else {
                    // turn our JSON into a JS object array we can use
                    const allNotes = JSON.parse(data);
                    // push the note to the array
                    allNotes.push(newNote);
                    // write the array back to the JSON we're reading, turning it into a nicely formatted string, logging an error if we encounter one
                    fs.writeFile(path, JSON.stringify(allNotes, null, 4), err => { if (err) console.error(err) });
                    res.json(newNote);
                };
            });
        }
        // since we don't have both, find out which we don't have and respond appropriately
        else {
            if (req.body.title) res.send('Body must have text.');
            if (req.body.text) res.send('Body must have title.');
        }
    }
    // since no body, give them back a message saying they need a body
    else res.send('POST request must contain body.');
});

notes.delete('/notes/:id', (req, res) => {
    // read the notes.json file
    fs.readFile(path, 'utf8', (err, data) => {
        // if we get an error, log the error
        if (err) { console.error(err); }
        // otherwise, we continue
        else {
            // turn our JSON into a JS object array
            const allNotes = JSON.parse(data)
                // filter out the note we want to delete
                .filter(noteObj => {
                    // return notes we don't want to delete back to the array
                    if(noteObj.id != req.params.id) return noteObj;
                    // return note we are deleting to the client
                    else res.json(noteObj);
            });
            // write the array back to the JSON we're reading, turning it into a nicely formatted string, logging an error if we encounter one
            fs.writeFile(path, JSON.stringify(allNotes, null, 4), err => { if (err) console.error(err) });
        };
    });
});

module.exports = notes;