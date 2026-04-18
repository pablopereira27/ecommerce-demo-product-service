const logger = require('../logger');

function registerProcessHandlers() {
    process.on('uncaughtException', (err) => {
        logger.fatal({ err }, 'Uncaught Exception');
        process.exit(1); // opcional: reiniciar via PM2/Kubernetes
    });

    process.on('unhandledRejection', (reason, promise) => {
        logger.error({ reason, promise }, 'Unhandled Rejection');
    });
}

module.exports = registerProcessHandlers;
