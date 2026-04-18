// Configurações
require('dotenv').config();
const { AppDataSource } = require('./data-source');

// Core libraries
const express = require('express');
const pino = require('pino-http');

// Utilitários e Middlewares
const { swaggerUi, swaggerSpec } = require('./swagger/swagger-config');
const logger = require('./logger');
const errorHandler = require('./middlewares/error-handler.middleware');
const registerProcessHandlers = require('./utils/process-handlers');

// Rotas
const routes = require('./routes');

const app = express();
const port = process.env.APP_PORT || 3000;

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

// Captura de erros globais fora do ciclo de requisição
registerProcessHandlers();

// Inicializa o banco antes de subir o servidor
AppDataSource.initialize()
    .then(() => {
        logger.info('O banco de dados foi inicializado!');

        app.listen(port, () => {
            logger.info(
                `Servidor em pleno funcionamento, rodando na porta ${port}.`
            );
        });
    })
    .catch((error) => {
        logger.fatal(
            { err: error },
            'Erro fatal: não foi possível inicializar o banco de dados'
        );
        process.exit(1);
    });
