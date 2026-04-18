class ProductDto {
    constructor(productEntity) {
        this.id = productEntity.id;
        this.name = productEntity.name;
        this.description = productEntity.description;
        this.price = parseFloat(productEntity.price);
        this.createdAt = productEntity.createdAt;
        this.updatedAt = productEntity.updatedAt;
    }
}

module.exports = ProductDto;
