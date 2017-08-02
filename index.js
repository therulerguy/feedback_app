const express = require('express');
const app = express();

// this is a route handler
app.get('/', (req, res) => {
    res.send({ hi: 'there' })
});

app.get('/greeting', (req, res) => {
    res.send({ hi: 'poop' })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);



 