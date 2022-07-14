const fs = require('fs');
const fsPromises = fs.promises;
/**
 * @param {String} origin - Directory that is read for files.
 * @param {String} destination - Directory for consolidated file to go, will default to 'consolidated' if not specified.
 */
async function consolidateToJson(origin, destination = 'consolidated') {
    // Declare an empty array to work with.
    const objs = [];
    // Retrieve file names from origin directory.
    const files = await fsPromises.readdir(origin);
    // If destination directory doesn't exist, create it.
    if(!files.includes(destination)) {
        fs.mkdirSync(`${origin}/${destination}`);
        console.log(`/${destination} not found, creating /${destination}.`);
    };
    // Asynchronously loop through all files,
    for await (const file of files) {
        if (file.endsWith('.json')) {
            // create a JS object from each file and push it to the objs array,
            objs.push(JSON.parse(await fsPromises.readFile(`${origin}/${file}`, 'utf-8')));
            // delete file we just read.
            fs.unlink(`${origin}/${file}`, err => { if (err) console.error(`Error deleting ${file}`, err) });
        };
    };
    // If there are any objects in the array,
    if (objs.length) {
        // write the objs array to a file
        fs.writeFile(`${origin}/${destination}/${Date.now()}.json`, JSON.stringify(objs, null, 4), err => {
            // if there was an error writing, log the error.
            if (err) console.error(`Error writing to /${destination}/${Date.now()}.json`, err);
        });
    }
    // If there was nothing to consolidate, let us know.
    else console.log('Nothing to consolidate.');
};

module.exports = consolidateToJson;