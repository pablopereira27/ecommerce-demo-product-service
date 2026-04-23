// Core libraries
const express = require('express');
const pino = require('pino-http');

// Utilitários e Middlewares
const { swaggerUi, swaggerSpec } = require('./swagger/swagger-config');
const logger = require('./logger');
const errorHandler = require('./middlewares/error-handler.middleware');

// Rotas
const createProductRoutes = require('./product/product.routes');

function createApp(manager) {
    const app = express();

    // Middlewares Globais
    app.use(pino({ logger }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Rotas e Documentação
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/products', createProductRoutes(manager));

    // Health check
    app.get('/', (req, res) => {
        res.send(
            `${new Date().toLocaleString()} - Servidor em pleno funcionamento!`
        );
    });

    // Middleware de erro
    app.use(errorHandler);

    return app;
}

module.exports = createApp;
