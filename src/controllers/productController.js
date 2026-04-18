const { AppDataSource } = require('../data-source');
const { MoreThanOrEqual, LessThanOrEqual } = require('typeorm');

const Product = require('../models/product');
const CreateProductDto = require('../dtos/createProductDto');
const UpdateProductDto = require('../dtos/updateProductDto');
const ProductListDto = require('../dtos/productListDto');
const ProductDto = require('../dtos/productDto');
const ValidationError = require('../errors/ValidationError');

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar por nome
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Preço mínimo
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Preço máximo
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de produtos paginada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductListDto'
 *       500:
 *         description: Erro interno
 */
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

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Busca produto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductDto'
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno
 */
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

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductDto'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductDto'
 *       400:
 *         description: Dados inválidos
 */
async function createProduct(req, res) {
    try {
        const dto = new CreateProductDto(req.body);
        const productRepo = AppDataSource.getRepository(Product);
        const newProduct = productRepo.create(dto);
        await productRepo.save(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res
                .status(400)
                .json({ error: 'Dados de produto inválidos' });
        }

        next(error);
    }
}

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductDto'
 *     responses:
 *       200:
 *         description: Produto atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductDto'
 *       400:
 *         description: Dados inválidos ou corpo vazio
 *       404:
 *         description: Produto não encontrado
 */
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
            return res
                .status(400)
                .json({ error: 'Dados de produto inválidos' });
        }

        next(error);
    }
}

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Remove um produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno
 */
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
