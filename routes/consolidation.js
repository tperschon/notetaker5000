// import dependencies
const express = require('express');
const consolidation = express.Router();
const consolidateToJson = require('../utils/consolidateToJson');
consolidation.use(express.json());
consolidation.use(express.urlencoded({ extended: true }));
// set up our path
const p = require('path');
const path = p.join(__dirname, '../db/usage/');

// route to consolidate traffic data based on method parameter
consolidation.patch('/db/consolidation/:method', (req, res) => {
    // if there is an auth property in the body, proceed, if not, send back a rudimentary 404
    // I realize this isn't the most ideal implementation but this was just for practice/fun, in reality I'd want the response for a tokenless request to be uniform with other 404 responses
    if (req.body.auth) {
        // check for the matching token, if we have it proceed, if not, send back a rudimentary 404
        // again this is not an ideal implementation since it is being uploaded unobfuscated
        if (req.body.auth === 'testing') {
            // cascading switch with default sending back invalid parameters, made this way to be more adjustable/expandable
            switch(req.params.method.toUpperCase()) {
                case 'GET':
                case 'POST':
                case 'DELETE':
                case 'OTHER': {
                    // consolidate json traffick in the appropriate path with the given method
                    consolidateToJson(`${path}/${req.params.method}`);
                    // alert user that the files are being consolidated
                    res.send('Consolidating files.')
                    break;
                }
                default: res.send('Invalid paramaters.')
            };
        }
        else res.send('404');
    }
    else res.send('404');
});

module.exports = consolidation;