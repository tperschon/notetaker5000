// import dependencies
const express = require('express');
const path = require('path');
const api = require('./routes/index');
const logTraffic = require('./middleware/logTraffic');
const consolidateToJson = require('./utils/consolidateToJson');
// set up app and port
const app = express();
const PORT = process.env.PORT || 3001;
// set up imported routes to app
app.use(express.json());
app.use(express.urlencoded( { extended: true }))
app.use(logTraffic);
app.use(express.static('public'));
app.use('/', api);
// notes PAGE route (not to be confused with GET/POST/etc. routes to api/notes)
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
// start app listening, notify console that app started
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});