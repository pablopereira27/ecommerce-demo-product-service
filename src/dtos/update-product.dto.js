const {
    validate,
    updateProductSchema,
} = require('../validations/product-schema.validation');

class UpdateProductDto {
    constructor(data) {
        const normalized = {
            name: data.name?.trim(),
            description: data.description?.trim(),
            price: data.price ? parseFloat(data.price) : data.price,
        };

        validate(normalized, updateProductSchema);

        this.name = normalized.name;
        this.description = normalized.description;
        this.price = normalized.price;
    }
}

module.exports = UpdateProductDto;
