const { AppDataSource } = require('../data-source');
const { MoreThanOrEqual, LessThanOrEqual } = require('typeorm');

const Product = require('../models/product.entity');
const CreateProductDto = require('../dtos/create-product.dto');
const UpdateProductDto = require('../dtos/update-product.dto');
const ProductListDto = require('../dtos/product-list.dto');
const ProductDto = require('../dtos/product.dto');
const ValidationError = require('../errors/validation.error');

async function getAllProducts(req, res) {
    try {
        const { name, minPrice, maxPrice } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const productRepo = AppDataSource.getRepository(Product);

        const [products, total] = await productRepo.findAndCount({
            where: {
                ...(name && { name }),
                ...(minPrice && { price: MoreThanOrEqual(minPrice) }),
                ...(maxPrice && { price: LessThanOrEqual(maxPrice) }),
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        const dto = new ProductListDto(products, { total, page, limit });
        res.status(200).json(dto);
    } catch (error) {
        next(error);
    }
}

async function getProductById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const productRepo = AppDataSource.getRepository(Product);

        const product = await productRepo.findOneBy({ id });
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const dto = new ProductDto(product);
        res.json(dto);
    } catch (error) {
        next(error);
    }
}

async function createProduct(req, res) {
    try {
        const dto = new CreateProductDto(req.body);
        const productRepo = AppDataSource.getRepository(Product);
        const newProduct = productRepo.create(dto);
        await productRepo.save(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        if (error instanceof ValidationError) {
            req.log.warn({ body: req.body }, 'Dados de produto inválidos');
            return res
                .status(400)
                .json({ error: 'Dados de produto inválidos' });
        }

        next(error);
    }
}

async function updateProduct(req, res) {
    try {
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

        const dto = new UpdateProductDto(req.body);
        productRepo.merge(product, dto);
        await productRepo.save(product);

        res.status(200).json(product);
    } catch (error) {
        if (error instanceof ValidationError) {
            req.log.warn({ body: req.body }, 'Dados de produto inválidos');
            return res
                .status(400)
                .json({ error: 'Dados de produto inválidos' });
        }

        next(error);
    }
}

async function deleteProduct(req, res) {
    try {
        const id = parseInt(req.params.id);
        const productRepo = AppDataSource.getRepository(Product);
        const product = await productRepo.findOneBy({ id });

        if (!product)
            return res.status(404).json({ message: 'Produto não encontrado' });

        await productRepo.remove(product);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
