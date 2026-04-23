const request = require('supertest');

describe('Product Controller - Unit Tests', () => {
    describe('POST /products', () => {
        it('deve criar um produto válido', async () => {
            const res = await request(testApp())
                .post('/products')
                .set('Authorization', `Bearer ${global.testToken}`)
                .send({
                    name: 'Notebook',
                    description: 'Notebook gamer',
                    price: 3500,
                });

            expect(res).toHaveStatus(201);
            expect(res.body.name).toBe('Notebook');
        });

        it('deve retornar erro ao criar produto sem nome', async () => {
            const res = await request(testApp())
                .post('/products')
                .set('Authorization', `Bearer ${global.testToken}`)
                .send({ price: 3500 });

            expect(res).toHaveStatus(400);
        });

        it('deve retornar erro ao criar produto com preço negativo', async () => {
            const res = await request(testApp())
                .post('/products')
                .set('Authorization', `Bearer ${global.testToken}`)
                .send({
                    name: 'Mouse',
                    description: 'Mouse gamer',
                    price: -100,
                });

            expect(res).toHaveStatus(400);
        });
    });

    describe('GET /products/:id', () => {
        it('deve retornar 404 ao buscar produto inexistente', async () => {
            const res = await request(testApp())
                .get('/products/9999')
                .set('Authorization', `Bearer ${global.testToken}`);

            expect(res).toHaveStatus(404);
        });
    });

    describe('PUT /products/:id', () => {
        it('deve retornar 400 ao atualizar sem body', async () => {
            const created = await request(testApp())
                .post('/products')
                .set('Authorization', `Bearer ${global.testToken}`)
                .send({
                    name: 'Teclado',
                    description: 'Teclado mecânico',
                    price: 200,
                });

            const res = await request(testApp())
                .put(`/products/${created.body.id}`)
                .set('Authorization', `Bearer ${global.testToken}`)
                .send({});

            expect(res).toHaveStatus(400);
        });

        it('deve retornar 404 ao atualizar inexistente', async () => {
            const res = await request(testApp())
                .put('/products/9999')
                .set('Authorization', `Bearer ${global.testToken}`)
                .send({ price: 300 });

            expect(res).toHaveStatus(404);
        });

        it('deve retornar 400 ao atualizar com dados inválidos', async () => {
            const created = await request(testApp())
                .post('/products')
                .set('Authorization', `Bearer ${global.testToken}`)
                .send({
                    name: 'Monitor',
                    description: 'Monitor 24 polegadas',
                    price: 800,
                });

            const res = await request(testApp())
                .put(`/products/${created.body.id}`)
                .set('Authorization', `Bearer ${global.testToken}`)
                .send({ price: -50 });

            expect(res).toHaveStatus(400);
        });
    });

    describe('DELETE /products/:id', () => {
        it('deve retornar 404 ao excluir inexistente', async () => {
            const res = await request(testApp())
                .delete('/products/9999')
                .set('Authorization', `Bearer ${global.testToken}`);

            expect(res).toHaveStatus(404);
        });

        it('deve excluir produto existente com sucesso', async () => {
            const created = await request(testApp())
                .post('/products')
                .set('Authorization', `Bearer ${global.testToken}`)
                .send({
                    name: 'HD externo',
                    description: 'HD 1TB',
                    price: 400,
                });

            const res = await request(testApp())
                .delete(`/products/${created.body.id}`)
                .set('Authorization', `Bearer ${global.testToken}`);

            expect(res).toHaveStatus(204);
        });
    });

    describe('GET /products', () => {
        it('deve listar com filtros aplicados', async () => {
            await request(testApp())
                .post('/products')
                .set('Authorization', `Bearer ${global.testToken}`)
                .send({
                    name: 'Cadeira Gamer',
                    description: 'Confortável',
                    price: 1200,
                });

            const res = await request(testApp())
                .get('/products?name=Cadeira')
                .set('Authorization', `Bearer ${global.testToken}`);

            expect(res).toHaveStatus(200);
            expect(res.body.items.length).toBeGreaterThan(0);
        });

        it('deve retornar lista paginada', async () => {
            const res = await request(testApp())
                .get('/products?page=1&limit=2')
                .set('Authorization', `Bearer ${global.testToken}`);

            expect(res).toHaveStatus(200);
            expect(res.body.limit).toBe(2);
        });
    });

    describe('Token validation on Product routes', () => {
        it('should allow access with a valid token', async () => {
            const res = await request(testApp())
                .get('/products')
                .set('Authorization', `Bearer ${global.testToken}`);

            expect(res.statusCode).toBe(200);
        });

        it('should deny access when token is missing', async () => {
            const res = await request(testApp()).get('/products');

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('error', 'Token missing');
        });

        it('should deny access when token is invalid', async () => {
            const res = await request(testApp())
                .get('/products')
                .set('Authorization', 'Bearer invalidtoken123');

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('error', 'Invalid token');
        });
    });
});
