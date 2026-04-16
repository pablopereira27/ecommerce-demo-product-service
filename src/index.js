const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes');
app.use('/products', routes);

app.get('/', (req, res) => {
    res.send(
        `${new Date().toLocaleString()} - Servidor em pleno funcionamento!`
    );
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
