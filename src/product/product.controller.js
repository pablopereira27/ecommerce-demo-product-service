const ProductService = require('./product.service');
const CreateProductDto = require('./dtos/create-product.dto');
const UpdateProductDto = require('./dtos/update-product.dto');
const ProductListDto = require('./dtos/product-list.dto');
const ProductDto = require('./dtos/product.dto');
const ValidationError = require('../errors/validation.error');

class ProductController {
    constructor(manager) {
        this.service = new ProductService(manager);
    }

    getAllProducts = async (req, res, next) => {
        try {
            const { name, minPrice, maxPrice } = req.query;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const filters = { name, minPrice, maxPrice };
            const [products, total] = await this.service.findAll(
                filters,
                page,
                limit
            );

            const dto = new ProductListDto(products, { total, page, limit });
            res.status(200).json(dto);
        } catch (error) {
            next(error);
        }
    };

    getProductById = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const product = await this.service.findById(id);

            if (!product) {
                return res
                    .status(404)
                    .json({ message: 'Produto não encontrado' });
            }

            const dto = new ProductDto(product);
            res.json(dto);
        } catch (error) {
            next(error);
        }
    };

    createProduct = async (req, res, next) => {
        try {
            const dto = new CreateProductDto(req.body);
            const product = await this.service.create(dto);
            res.status(201).json(product);
        } catch (error) {
            if (error instanceof ValidationError) {
                req.log.warn(
                    { body: req.body },
                    error.message || 'Dados de produto inválidos'
                );
                return res.status(400).json({
                    error: error.message || 'Dados de produto inválidos',
                });
            }

            next(error);
        }
    };

    updateProduct = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);

            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({
                    message: 'Nenhum campo enviado para atualização.',
                });
            }

            const dto = new UpdateProductDto(req.body);
            const updatedProduct = await this.service.update(id, dto);

            if (!updatedProduct) {
                return res.status(404).json({
                    message: 'Produto não encontrado para atualização',
                });
            }

            res.status(200).json(updatedProduct);
        } catch (error) {
            if (error instanceof ValidationError) {
                req.log.warn(
                    { body: req.body },
                    error.message || 'Dados de produto inválidos'
                );

                return res.status(400).json({
                    error: error.message || 'Dados de produto inválidos',
                });
            }

            next(error);
        }
    };

    deleteProduct = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const deletedProduct = await this.service.delete(id);

            if (!deletedProduct) {
                return res
                    .status(404)
                    .json({ message: 'Produto não encontrado para exclusão' });
            }

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}

module.exports = ProductController;
