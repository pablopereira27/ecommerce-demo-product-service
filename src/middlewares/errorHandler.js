function errorHandler(err, req, res, next) {
    res.status(500).send('Erro interno do servidor.');
}

module.exports = errorHandler;
