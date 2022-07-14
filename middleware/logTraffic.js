const path = require('path');
const createJson = require('../utils/createJson.js');

// function to log traffic and write it to folder/files based on request method
function logTraffic(req, res, next) {
    // get the request method
    const method = req.method;
    // create an object with some request data and a timestamp
    const reqObj = {
        method: method,
        path: req.path,
        headers: req.headers ? req.headers : null,
        body: req.body ? req.body : null,
        time: new Date()
    };
    // cascading switch to write files to appropriate folders
    switch(method) {
        case 'GET':
        case 'POST':
        case 'DELETE': {
            createJson(path.join(__dirname, `../db/usage/${method}/${Date.now()}.json`), reqObj);
            console.log(`Writing traffic data to ${path.join(__dirname, `../db/usage/${method}.json`)}.`)
            break;
        }
        // default case to write any non-explicitly handled request types to an other folder
        default: {
            createJson(path.join(__dirname, `../db/usage/OTHER/${Date.now()}.json`), reqObj);
            console.log(`Writing traffic data to ${path.join(__dirname, `../db/usage/other.json`)}.`)
        }
    }
    // pass the request on
    next();
};

module.exports = logTraffic;