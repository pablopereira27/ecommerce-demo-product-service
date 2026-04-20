const Product = require('./entities/product.entity');
const { MoreThanOrEqual, LessThanOrEqual, Like } = require('typeorm');

class ProductService {
    constructor(manager) {
        this.repo = manager.getRepository(Product);
    }

    async create(dto) {
        const product = this.repo.create(dto);
        return this.repo.save(product);
    }

    async findAll(filters, page = 1, limit = 10) {
        const where = {};
        if (filters.name) where.name = Like(`%${filters.name}%`);
        if (filters.minPrice) where.price = MoreThanOrEqual(filters.minPrice);
        if (filters.maxPrice) where.price = LessThanOrEqual(filters.maxPrice);
        return this.repo.findAndCount({
            where,
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async findById(id) {
        return this.repo.findOneBy({ id });
    }

    async update(id, dto) {
        const product = await this.findById(id);
        if (!product) return null;
        this.repo.merge(product, dto);
        return this.repo.save(product);
    }

    async delete(id) {
        const product = await this.findById(id);
        if (!product) return null;
        await this.repo.remove(product);
        return true;
    }
}

module.exports = ProductService;
