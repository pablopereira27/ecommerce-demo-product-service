// Configurações
require('dotenv').config();
const { AppDataSource } = require('./data-source');
const app = require('./app');
const logger = require('./logger');
const registerProcessHandlers = require('./utils/process-handlers');

const port = process.env.APP_PORT || 3000;

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
