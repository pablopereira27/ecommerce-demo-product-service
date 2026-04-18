function errorHandler(err, req, res, next) {
    req.log.error({ err }, 'Ocorreu um Erro inesperado.');
    res.status(500).send('Erro interno do servidor.');
}

module.exports = errorHandler;
