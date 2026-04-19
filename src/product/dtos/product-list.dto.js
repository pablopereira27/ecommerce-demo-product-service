const ProductDto = require('./product.dto');

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
