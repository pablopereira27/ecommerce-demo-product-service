const fs = require('fs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

if (fs.existsSync('.env.test')) {
    dotenv.config({ path: '.env.test' });
} else {
    dotenv.config({ path: '.env' });
}

const { AppDataSource } = require('../src/data-source');
const createApp = require('../src/app');

let connection;
let queryRunner;
let app;

beforeAll(async () => {
    connection = await AppDataSource.initialize();
});

afterAll(async () => {
    await connection.destroy();
});

beforeEach(async () => {
    // cria um queryRunner para controlar a transação
    queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    app = createApp(queryRunner.manager);
});

afterEach(async () => {
    // desfaz tudo que foi feito no teste a nível de banco de dados
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
});

// Gera um token válido para os testes
global.testToken = jwt.sign(
    { userId: 1, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
);

global.testApp = () => app;

// Matchers customizados
expect.extend({
    toHaveStatus(received, expected) {
        const pass = received.status === expected;
        if (pass) {
            return {
                pass: true,
                message: () => `Status esperado: ${expected}`,
            };
        } else {
            return {
                pass: false,
                message: () =>
                    `Status esperado: ${expected}.\nStatus recebido: ${received.status}.\nResposta: ${JSON.stringify(received.body, null, 2)}`,
            };
        }
    },
});
