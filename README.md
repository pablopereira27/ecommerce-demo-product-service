# Ecommerce Demo - Product Service

## 📖 Proposta

Este repositório faz parte de um projeto **demo de microserviços** para um e-commerce simples.  
A arquitetura é composta por 3 serviços independentes:

- [Auth Service](https://github.com/seuuser/ecommerce-demo-auth-service)
- [Product Service](https://github.com/seuuser/ecommerce-demo-product-service) ← este repositório
- [Order Service](https://github.com/seuuser/ecommerce-demo-order-service)

O objetivo é ser **simples e leve**, mostrando boas práticas de microserviços.  
No futuro, será lançada uma versão utilizando **NestJS** e outros frameworks.

---

## 🛠️ Tecnologias utilizadas

- **Node.js**: >= 18 (atualmente usando 24.11.1 via nvm)
- **Express**: ^5.2.1
- Futuras bibliotecas serão adicionadas conforme o desenvolvimento (ex.: JWT, Winston, Jest, etc.)

---

## 🚀 Etapas de desenvolvimento

Abaixo está o roadmap de implementação. Cada etapa terá uma especificação detalhada.

<details>
    <summary>✅ 1. Estrutura inicial</summary>

- Configuração do projeto com `npm init`
- Adição do Express 5
- Criação do `index.js` com Hello World

</details>

<details>
    <summary>✅ 2. CRUD de Produtos</summary>

- Definição de rotas REST (GET, POST, PUT, DELETE)
- Separação em `routes/`, `controllers/` e `models/`

</details>

<details>
    <summary>✅ 3. Banco de dados</summary>

Nesta etapa será feita a integração do **Product Service** com um banco de dados relacional.

- Configuração de variáveis de ambiente com **dotenv** (`.env`)
    - Exemplo: `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`
- Uso do **TypeORM** para mapear entidades e gerenciar migrations
    - Entidade inicial: `Product` (campos: `id`, `name`, `price`)
- Banco de dados: **MySQL**
    - Cada microserviço terá seu próprio banco isolado (ex.: `auth_db`, `product_db`, `order_db`)
    - Isso garante autonomia e independência entre os serviços
- Criação da tabela `products` no banco específico do serviço
- **Validação manual inicial** da conexão e persistência de dados

</details>

<details>
    <summary>⬜ 4. Dockerização</summary>

- Criação de `Dockerfile`
- Configuração de `docker-compose` para rodar localmente

</details>

<details>
  <summary>⬜ 5. Observabilidade</summary>

- Logs estruturados
- Testes unitários básicos

</details>

---

## 📂 Estrutura de pastas

```
src/
    routes/
    controllers/
    models/
    tests/
Dockerfile
package.json
README.md
```

---

## 🎯 Objetivo

Este projeto é uma **vitrine de código** para demonstrar:

- Conhecimento em microserviços
- Organização de projetos
- Uso de Node.js + Express
- Boas práticas de desenvolvimento
