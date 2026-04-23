const pino = require('pino');

describe('Logger com Pino', () => {
    it('deve logar mensagem de info em JSON', () => {
        const logs = [];
        const stream = {
            write: (msg) => logs.push(JSON.parse(msg)),
        };

        const customLogger = pino({ level: 'info' }, stream);
        customLogger.info({ event: 'teste' }, 'Mensagem de teste');

        expect(logs[0].level).toBe(pino.levels.values.info);
        expect(logs[0].msg).toBe('Mensagem de teste');
        expect(logs[0].event).toBe('teste');
    });
});
