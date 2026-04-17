const ProductDto = require('./productDto');

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductListDto:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductDto'
 *         pagination:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *             page:
 *               type: integer
 *             limit:
 *               type: integer
 *             totalPages:
 *              type: integer
 */
class ProductListDto {
    constructor(products, pagination) {
        this.items = products.map((p) => new ProductDto(p));
        this.total = pagination.total;
        this.page = pagination.page;
        this.limit = pagination.limit;
        this.totalPages = Math.ceil(pagination.total / pagination.limit);
    }
}

module.exports = ProductListDto;
