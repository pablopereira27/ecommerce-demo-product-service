const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product Service API',
            version: '1.0.0',
            description: 'Documentação da API de Produtos',
        },
    },
    apis: ['./src/controllers/*.js', './src/dtos/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
