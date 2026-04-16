// controllers/productController.js
const { Product } = require('../models/product');

// Exemplo fake, depois substitui por TypeORM
let products = [new Product(1, 'Produto Demo', 'Descrição inicial', 99.9)];

async function getAllProducts(req, res) {
    res.status(200).json(products);
}

async function createProduct(req, res) {
    const { name, description, price } = req.body || {};
    const required = { name, description, price };

    const missing = Object.entries(required)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

    if (missing.length > 0) {
        return res.status(400).json({
            message: `Campos obrigatórios faltando: ${missing.join(', ')}`,
        });
    }

    const newProduct = new Product(
        products.length + 1,
        name,
        description,
        price
    );
    products.push(newProduct);
    res.status(201).json(newProduct);
}

async function updateProduct(req, res) {
    const id = parseInt(req.params.id);
    let index = products.findIndex((p) => p.id === id);

    if (index === -1)
        return res.status(404).json({ message: 'Produto não encontrado' });

    if (!req.body || Object.keys(req.body).length === 0) {
        return res
            .status(400)
            .json({ message: 'Nenhum campo enviado para atualização.' });
    }

    products[index] = { ...products[index], ...req.body };
    res.status(200).json(products[index]);
}

async function deleteProduct(req, res) {
    const id = parseInt(req.params.id);
    const index = products.findIndex((p) => p.id === id);

    if (index === -1)
        return res.status(404).json({ message: 'Produto não encontrado' });

    products.splice(index, 1);
    res.status(204).send();
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
