const {
    validate,
    createProductSchema,
} = require('../validation/productSchema');

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProductDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *       required:
 *         - name
 *         - description
 *         - price
 */
class CreateProductDto {
    constructor(data) {
        const normalized = {
            name: data.name?.trim(),
            description: data.description?.trim(),
            price: data.price ? parseFloat(data.price) : data.price,
        };

        validate(normalized, createProductSchema);

        this.name = normalized.name;
        this.description = normalized.description;
        this.price = normalized.price;
    }
}

module.exports = CreateProductDto;
