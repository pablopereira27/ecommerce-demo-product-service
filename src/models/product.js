class Product {
    id;
    name;
    description;
    price;

    constructor(id, name, description, price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }
}

module.exports = { Product };
