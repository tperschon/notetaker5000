const express = require('express');
const consolidation = express.Router();
const p = require('path');
const path = p.join(__dirname, '../db/usage/');
const consolidateToJson = require('../utils/consolidateToJson');
consolidation.use(express.json());
consolidation.use(express.urlencoded({ extended: true }))

consolidation.patch('/db/consolidation/:method', (req, res) => {
    if (req.body.auth) {
        if (req.body.auth === 'testing') {
            switch(req.params.method.toUpperCase()) {
                case 'GET':
                case 'POST':
                case 'DELETE':
                case 'OTHER': {
                    consolidateToJson(`${path}/${req.params.method}`);
                    res.send('Consolidating files.')
                    break;
                }
                default: res.send('Invalid paramaters.')
            }
        }
        else res.send('404')
    }
    else res.send('404')
});

module.exports = consolidation;