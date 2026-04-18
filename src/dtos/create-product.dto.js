const {
    validate,
    createProductSchema,
} = require('../validations/product-schema.validation');

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
