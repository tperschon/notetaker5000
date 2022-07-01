const fs = require('fs');

function createJson(path, object) {
    fs.writeFile(path, JSON.stringify(object, null, 4), err => { if (err) console.error(`Error writing file to ${path}`, err) });
};

module.exports = createJson;