const path = require('path');
const createJson = require('../utils/createJson.js');
const consolidateToJson = require('../utils/consolidateToJson');

function logTraffic(req, res, next) {
    console.log(`Received ${req.method} request.`)
    const method = req.method;
    if(method === 'POST') console.log(req.body)
    const reqObj = {
        method: method,
        path: req.path,
        headers: req.headers ? req.headers : null,
        body: req.body ? req.body : null,
        time: new Date()
    };
    switch(method) {
        case 'GET':
        case 'POST':
        case 'DELETE': {
            createJson(path.join(__dirname, `../db/usage/${method}/${Date.now()}.json`), reqObj);
            console.log(`Writing traffic data to ${path.join(__dirname, `../db/usage/${method}.json`)}.`)
            break;
        }
        default: {
            createJson(path.join(__dirname, `../db/usage/other/${Date.now()}.json`), reqObj);
            console.log(`Writing traffic data to ${path.join(__dirname, `../db/usage/other.json`)}.`)
        }
    }
    next();
};

function consolidateTraffic(method) {

}

module.exports = logTraffic;