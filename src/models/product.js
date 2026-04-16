const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Product',
    tableName: 'products',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'varchar',
        },
        description: {
            type: 'text',
        },
        price: {
            type: 'decimal',
            precision: 10,
            scale: 2,
        },
    },
});
