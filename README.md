# Ecommerce Demo - Product Service

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-5.2.1-blue?logo=express)
![TypeORM](https://img.shields.io/badge/TypeORM-0.3.28-orange?logo=typeorm)
![MySQL](https://img.shields.io/badge/MySQL-8.x-blue?logo=mysql)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-lightgrey?logo=swagger)
![Pino](https://img.shields.io/badge/Pino-11.0.0-yellow?logo=javascript)
![Jest](https://img.shields.io/badge/Jest-30.3.0-brightgreen?logo=jest)
![Supertest](https://img.shields.io/badge/Supertest-7.2.2-lightblue)

## 📖 Proposta

Este repositório faz parte de um projeto **demo de microserviços** para um e-commerce simples.  
A arquitetura é composta por 3 serviços independentes:

- [Auth Service](https://github.com/pablopereira27/ecommerce-demo-auth-service)
- [Product Service](https://github.com/pablopereira27/ecommerce-demo-product-service) ← este repositório
- [Order Service](https://github.com/pablopereira27/ecommerce-demo-order-service)

O objetivo é ser **simples e leve**, mostrando boas práticas de microserviços.  
No futuro, será lançada uma versão utilizando **NestJS** e outros frameworks.

---

## 🛠️ Tecnologias utilizadas

- **Node.js**: >= 18 (atualmente usando 24.11.1 via nvm)
- **Express**: ~5.2.1 — framework web minimalista
- **TypeORM**: ~0.3.x — ORM para integração com MySQL
- **MySQL**: 8.x — banco relacional dedicado ao serviço
- **dotenv**: ~17.x — gerenciamento de variáveis de ambiente
- **pino-http**: ~11.0.0 — logging estruturado em JSON
- **Swagger UI Express**: ~5.x — documentação interativa da API
- **Jest**: ^30.x — framework de testes unitários e integração
- **Supertest**: ^7.2.x — testes de endpoints HTTP

Futuras bibliotecas serão adicionadas conforme o desenvolvimento (ex.: JWT, etc.)

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
    <summary>✅ 4. DTOs (Data Transfer Objects)</summary>

Nesta etapa serão adicionados DTOs para separar os contratos de entrada e saída da API das entidades do banco de dados.

- CreateProductDto e UpdateProductDto para normalização e validação
- ProductDto para saída de um único produto
- ProductListDto para saída de listas paginadas
- Preparação para futura documentação com Swagger/OpenAPI

</details>

<details>
    <summary>✅ 5. Documentação com Swagger</summary>

Será integrada a documentação da API utilizando Swagger/OpenAPI.

- Exposição clara dos contratos de entrada e saída
- Inclusão dos DTOs na documentação
- Interface interativa para testes dos endpoints
- Facilitar consumo da API por outros desenvolvedores

</details>

<details>
    <summary>✅ 6. Logs</summary>

Nesta etapa serão implementados mecanismos de **log estruturado** para aumentar a confiabilidade do serviço.

- Integração da biblioteca **Pino** para geração de logs em JSON
- Definição de níveis de severidade (`info`, `warn`, `error`, `fatal`)

</details>

<details>
    <summary>✅ 7. Testes (Unitários e Integração)</summary>

- Configuração do **Jest** como framework de testes
- Testes **unitários** para controllers, services e validações
- Testes **de integração** para endpoints REST (ex.: criar produto e validar com GET)
- Uso de transações e rollback para manter banco limpo entre execuções

</details>

<details>
    <summary>⬜ 8. Autenticação via Token</summary>

- Nesta etapa será feita a integração da autenticação no Product Service.
- Receber tokens JWT emitidos pelo Auth Service
- Criar middleware para validar o token em todas as rotas do CRUD
- Ajustar testes unitários e de integração para incluir cenários autenticados e não autenticados
- Garantir que apenas usuários válidos possam acessar as rotas de produtos

</details>

<details>
    <summary>⬜ 9. Dockerização</summary>

Será feita a dockerização do serviço para facilitar a execução em ambientes isolados.

- Criação de `Dockerfile` para empacotar o serviço
- Configuração de `docker-compose` para rodar localmente com banco de dados e dependências
- Preparação para futura orquestração em ambientes maiores
- Testes de execução em container para validar compatibilidade

</details>

<details>
    <summary>⬜ 10. Observabilidade (Logs + Métricas)</summary>

Após a dockerização, serão adicionados mecanismos de **observabilidade completa** para acompanhar a saúde e performance do serviço.

- Integração com **Loki** para armazenamento e consulta centralizada dos logs
- Configuração do **Prometheus** para coleta de métricas (requisições, tempo de resposta, uso de recursos)
- Integração com **Grafana** para dashboards e alertas
- Definição de thresholds para alertas automáticos (ex.: latência > 500ms)
- Visualização em tempo real e notificações em caso de falhas

</details>

<details>
    <summary>⬜ 11. Kubernetes</summary>

Será feita a orquestração dos containers em um cluster Kubernetes para garantir escalabilidade e alta disponibilidade.

- Criação de manifestos YAML (`Deployment`, `Service`, `ConfigMap`, `Secret`)
- Configuração de réplicas para escalabilidade automática
- Balanceamento de carga entre instâncias do serviço
- Integração com Prometheus e Grafana para observabilidade em cluster
- Garantia de resiliência: realocação automática de pods em caso de falha
- Preparação para ambientes de produção com CI/CD

</details>

---

## 📚 Documentação da API

Toda a documentação Swagger/OpenAPI está centralizada em **`src/swagger/docs/`**.

- Cada módulo possui seus próprios arquivos de documentação (ex.: `product-controller.docs.js`, `product.dto.docs.js`).
- O Swagger é configurado para buscar automaticamente todos os arquivos e subpastas (`./src/swagger/docs/**/*.js`).
- Isso mantém os controllers e DTOs limpos, enquanto a documentação fica organizada em um único lugar.

Para visualizar a documentação interativa, basta rodar o serviço e acessar a url `/api-docs`:  
No ambiente local: `http://localhost:3000/api-docs`

## 📖 Guia de Nomenclatura e Sufixos

Este projeto adota **kebab-case** para todos os arquivos, com sufixos que indicam claramente o papel de cada módulo.  
Funções e variáveis internas seguem **camelCase**, enquanto classes (quando houver) usam **PascalCase**.

| Categoria         | Padrão de Nome                    | Exemplo                      | Observação                                         |
| ----------------- | --------------------------------- | ---------------------------- | -------------------------------------------------- |
| **Controllers**   | `<nome>.controller.js`            | `product.controller.js`      | Define rotas e lógica de entrada/saída             |
| **DTOs**          | `<nome>.dto.js`                   | `product.dto.js`             | Objetos de transferência de dados e validações     |
| **Models**        | `<nome>.entity.js` ou `.model.js` | `product.entity.js`          | Entidades do banco (TypeORM) ou modelos de domínio |
| **Middlewares**   | `<nome>.js`                       | `error-handler.js`           | O sufixo é opcional                                |
| **Docs**          | `<nome>.docs.js`                  | `product.docs.js`            | Documentação JSDoc/Swagger                         |
| **Testes**        | `<nome>.test.js`                  | `product.controller.test.js` | Testes unitários e de integração (Jest)            |
| **Utils/Helpers** | `<nome>.js`                       | `date-utils.js`              | Funções auxiliares, sem sufixo especial            |

### ✅ Regras gerais

- **Arquivos**: sempre em **kebab-case**.
- **Testes**: sempre com sufixo `.test.js`.
- **DTOs, Controllers, Entities, Docs**: sempre com sufixo explícito.
- **Middlewares**: não precisam de sufixo `.middleware.js`.
- **Variáveis e funções**: camelCase.
- **Classes**: PascalCase.

### 📂 Estrutura de pastas

```
scripts/
src/
├── errors/
├── middlewares/
├── product/
|   ├── dtos/
|   ├── entities/
|   └── validations/
├── swagger/
|   └── docs
├── utils/
├── app.js
├── data-source.js
└── index.js
tests/
.env
Dockerfile
package.json
README.md

```

---

## ⚙️ Ambiente de Testes

- O projeto utiliza variáveis de ambiente definidas em arquivos `.env`.
- Para testes, você pode criar um arquivo `.env.test` com valores específicos (ex.: banco de dados de teste, `JWT_SECRET=testsecret`).
- Caso o `.env.test` não exista, o sistema pode carregar o `.env` padrão.
- Exemplo de `.env.test`:
    ```env
    DB_HOST=localhost
    DB_USER=test_user
    DB_PASS=test_pass
    DB_NAME=product_db_test
    JWT_SECRET=testsecret
    ```

> 💡 Recomenda-se manter todas as variáveis necessárias também no .env.test, mesmo que com valores diferentes, para evitar falhas nos testes.

---

## 🧪 Estratégia de Testes

Este serviço possui dois níveis de testes: **unitários** e **de integração**.  
Abaixo estão os cenários planejados para garantir cobertura completa do CRUD de produtos.

<details>
    <summary>Testes Unitários</summary>

| Endpoint             | Cenário                           | Objetivo                              |
| -------------------- | --------------------------------- | ------------------------------------- |
| POST /products       | Criar produto válido              | Verificar retorno 201 e corpo correto |
| POST /products       | Criar produto sem nome            | Retornar 400 com mensagem de erro     |
| POST /products       | Criar produto com dados inválidos | Garantir que ValidationError gera 400 |
| GET /products/:id    | Buscar produto inexistente        | Retornar 404                          |
| PUT /products/:id    | Atualizar sem body                | Retornar 400                          |
| PUT /products/:id    | Atualizar inexistente             | Retornar 404                          |
| PUT /products/:id    | Atualizar com dados inválidos     | Retornar 400                          |
| DELETE /products/:id | Excluir inexistente               | Retornar 404                          |
| DELETE /products/:id | Excluir existente                 | Retornar 204                          |
| GET /products        | Listar com filtros                | Garantir aplicação correta            |
| GET /products        | Paginação                         | Retornar lista paginada com metadados |
| GET /products        | Token válido                      | Retornar 200 e permitir acesso        |
| GET /products        | Token ausente                     | Retornar 401 com erro "Token missing" |
| GET /products        | Token inválido                    | Retornar 401 com erro "Invalid token" |

</details>

<details>
    <summary>Testes de Integração</summary>

| Endpoint                   | Cenário                              | Objetivo                         |
| -------------------------- | ------------------------------------ | -------------------------------- |
| POST + GET /products       | Criar e buscar produto               | Garantir persistência            |
| PUT + GET /products/:id    | Atualizar e verificar                | Confirmar alteração salva        |
| DELETE + GET /products/:id | Excluir e verificar                  | Confirmar exclusão               |
| GET /products              | Listar múltiplos produtos            | Validar paginação e filtros      |
| CRUD completo              | Criar → Atualizar → Buscar → Excluir | Validar ciclo de vida do produto |

</details>

---

## 🎯 Objetivo

Este projeto é uma **vitrine de código** para demonstrar:

- Conhecimento em microserviços
- Organização de projetos
- Uso de Node.js + Express
- Boas práticas de desenvolvimento
