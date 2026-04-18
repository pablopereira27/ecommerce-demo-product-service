// Configurações
require('dotenv').config();
const { AppDataSource } = require('./data-source');

// Core libraries
const express = require('express');

// Utilitários e Middlewares
const { swaggerUi, swaggerSpec } = require('./swagger/swagger-config');
const errorHandler = require('./middlewares/errorHandler');

// Rotas
const routes = require('./routes');

const app = express();
const port = process.env.APP_PORT || 3000;

// Middlewares Globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas e Documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/products', routes);

// Health check
app.get('/', (req, res) => {
    res.send(
        `${new Date().toLocaleString()} - Servidor em pleno funcionamento!`
    );
});

// Middleware de erro
app.use(errorHandler);

// Inicializa o banco antes de subir o servidor
AppDataSource.initialize()
    .then(() => {
        console.log('O banco de dados foi inicializado!');

        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}.`);
        });
    })
    .catch((err) => {
        console.error('Erro durante a inicialização do banco de dados:', err);
    });
