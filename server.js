const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const api = require('./routes/index');

app.use(express.json());
app.use(express.static('public'));
app.use('/', api);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});