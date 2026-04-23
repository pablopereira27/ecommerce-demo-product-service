const express = require('express');
const ProductController = require('./product.controller');
const authMiddleware = require('../middlewares/auth.middleware');

function createProductRoutes(manager) {
    const router = express.Router();
    const controller = new ProductController(manager);

    router.use(authMiddleware);

    router.get('/', controller.getAllProducts);
    router.get('/:id', controller.getProductById);
    router.post('/', controller.createProduct);
    router.put('/:id', controller.updateProduct);
    router.delete('/:id', controller.deleteProduct);

    return router;
}

module.exports = createProductRoutes;
