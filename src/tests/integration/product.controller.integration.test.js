const request = require('supertest');

describe('Product Controller - Integration Tests', () => {
    it('deve criar e buscar produto', async () => {
        const created = await request(testApp()).post('/products').send({
            name: 'Mouse',
            description: 'Mouse ótico',
            price: 150,
        });
        const res = await request(testApp()).get(
            `/products/${created.body.id}`
        );
        expect(res).toHaveStatus(200);
        expect(res.body.name).toBe('Mouse');
    });

    it('deve atualizar produto e verificar persistência', async () => {
        const created = await request(testApp()).post('/products').send({
            name: 'Celular Samsung',
            description: 'Galaxy S21',
            price: 1500,
        });
        await request(testApp())
            .put(`/products/${created.body.id}`)
            .send({ price: 1350 });
        const res = await request(testApp()).get(
            `/products/${created.body.id}`
        );
        expect(res.body.price).toBe(1350);
    });

    it('deve excluir produto e verificar inexistência', async () => {
        const created = await request(testApp()).post('/products').send({
            name: 'Impressora',
            description: 'Laser',
            price: 500,
        });
        await request(testApp()).delete(`/products/${created.body.id}`);
        const res = await request(testApp()).get(
            `/products/${created.body.id}`
        );
        expect(res).toHaveStatus(404);
    });

    it('deve listar múltiplos produtos com paginação real', async () => {
        await request(testApp())
            .post('/products')
            .send({ name: 'Produto A', price: 100 });
        await request(testApp())
            .post('/products')
            .send({ name: 'Produto B', price: 200 });
        const res = await request(testApp()).get('/products?page=1&limit=1');
        expect(res).toHaveStatus(200);
        expect(res.body.total).toBeGreaterThan(1);
        expect(res.body.limit).toBe(1);
    });

    it('deve validar ciclo completo CRUD', async () => {
        // Create
        const created = await request(testApp()).post('/products').send({
            name: 'Produto CRUD',
            description: 'Fluxo completo',
            price: 999,
        });
        expect(created).toHaveStatus(201);

        // Update
        const updated = await request(testApp())
            .put(`/products/${created.body.id}`)
            .send({ price: 888 });
        expect(updated).toHaveStatus(200);

        // Read
        const fetched = await request(testApp()).get(
            `/products/${created.body.id}`
        );
        expect(fetched.body.price).toBe(888);

        // Delete
        const deleted = await request(testApp()).delete(
            `/products/${created.body.id}`
        );
        expect(deleted).toHaveStatus(204);

        // Confirm deletion
        const res = await request(testApp()).get(
            `/products/${created.body.id}`
        );
        expect(res).toHaveStatus(404);
    });
});
