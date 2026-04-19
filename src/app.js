// Core libraries
const express = require('express');
const pino = require('pino-http');

// Utilitários e Middlewares
const { swaggerUi, swaggerSpec } = require('./swagger/swagger-config');
const logger = require('./logger');
const errorHandler = require('./middlewares/error-handler.middleware');
const routes = require('./product/product.routes');

const app = express();

// Middlewares Globais
app.use(pino({ logger }));
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

module.exports = app;
