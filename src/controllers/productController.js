const { AppDataSource } = require('../data-source');
const { MoreThanOrEqual, LessThanOrEqual } = require('typeorm');
const Product = require('../models/product');

async function getAllProducts(req, res) {
    const { name, minPrice, maxPrice } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const productRepo = AppDataSource.getRepository('Product');

    const [products, total] = await productRepo.findAndCount({
        where: {
            ...(name && { name }),
            ...(minPrice && { price: MoreThanOrEqual(minPrice) }),
            ...(maxPrice && { price: LessThanOrEqual(maxPrice) }),
        },
        skip: (page - 1) * limit,
        take: limit,
    });

    res.status(200).json({
        data: products,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    });
}

async function getProductById(req, res) {
    const id = parseInt(req.params.id);
    const productRepo = AppDataSource.getRepository(Product);

    const product = await productRepo.findOneBy({ id });
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
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

    const productRepo = AppDataSource.getRepository(Product);
    const newProduct = productRepo.create({ name, description, price });
    await productRepo.save(newProduct);

    res.status(201).json(newProduct);
}

async function updateProduct(req, res) {
    const id = parseInt(req.params.id);
    const productRepo = AppDataSource.getRepository(Product);
    const product = await productRepo.findOneBy({ id });

    if (!product)
        return res.status(404).json({ message: 'Produto não encontrado' });

    if (!req.body || Object.keys(req.body).length === 0) {
        return res
            .status(400)
            .json({ message: 'Nenhum campo enviado para atualização.' });
    }

    productRepo.merge(product, req.body);
    await productRepo.save(product);

    res.status(200).json(product);
}

async function deleteProduct(req, res) {
    const id = parseInt(req.params.id);
    const productRepo = AppDataSource.getRepository(Product);
    const product = await productRepo.findOneBy({ id });

    if (!product)
        return res.status(404).json({ message: 'Produto não encontrado' });

    await productRepo.remove(product);
    res.status(204).send();
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
