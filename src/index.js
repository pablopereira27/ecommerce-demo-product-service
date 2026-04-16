// Config
require('dotenv').config();
const { AppDataSource } = require('./data-source');

// Core libraries
const express = require('express');

const routes = require('./routes');

const app = express();
const port = process.env.APP_PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', routes);

// Health check
app.get('/', (req, res) => {
    res.send(
        `${new Date().toLocaleString()} - Servidor em pleno funcionamento!`
    );
});

// inicializa o banco antes de subir o servidor
AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });
