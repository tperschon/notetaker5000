const path = require('path');
const addToJson = require('../utils/addToJson.js');

function logTraffic(req, res, next) {
    console.log(`Received ${req.method} request.`)
    const method = req.method;
    const reqObj = {
        method: method,
        headers: req.headers ? req.headers : null,
        body: req.body ? req.body : null,
        time: new Date()
    };
    switch(method) {
        case 'GET':
        case 'POST':
        case 'DELETE': {
            addToJson(path.join(__dirname, `../db/usage/${method}.json`), reqObj);
            console.log(`Writing traffic data to ${path.join(__dirname, `../db/usage/${method}.json`)}.`)
            break;
        }
        default: {
            addToJson(path.join(__dirname, `../db/usage/other.json`), reqObj);
            console.log(`Writing traffic data to ${path.join(__dirname, `../db/usage/other.json`)}.`)
        }
    }
    next();
};

module.exports = logTraffic;