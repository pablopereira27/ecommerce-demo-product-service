require('dotenv').config();
const { DataSource } = require('typeorm');

const Product = require('./product/entities/product.entity');

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: process.env.NODE_ENV === 'development',
    entities: [Product],
});

module.exports = { AppDataSource };
