require('dotenv').config();
const { DataSource } = require('typeorm');

const Product = require('./models/product');

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Product],
});

module.exports = { AppDataSource };
