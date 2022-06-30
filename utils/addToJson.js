const fs = require('fs');

function addToJson(path, object) {
    // read the file at the path
    fs.readFile(path, 'utf8', (err, data) => {
        // if we get an error, log the error
        if (err) console.error(err);
        // otherwise, we continue
        else {
            // turn our JSON into a JS object array we can use
            const dataArray = JSON.parse(data);
            // push the note to the array
            dataArray.push(object);
            // write the array back to the JSON we're reading, turning it into a nicely formatted string, logging an error if we encounter one
            fs.writeFile(path, JSON.stringify(dataArray, null, 4), err => { if (err) console.error(err) });
        };
    });
};

module.exports = addToJson;