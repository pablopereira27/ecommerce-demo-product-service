const { AppDataSource } = require('../data-source');
const createApp = require('../app');

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
