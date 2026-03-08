# Order API

API desenvolvida em Node.js para gerenciamento de pedidos.

## Tecnologias utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Swagger (documentação)

## Endpoints

### Criar pedido

POST /order

### Buscar pedido

GET /order/{orderId}

### Listar pedidos

GET /order/list

### Atualizar pedido

PUT /order/{orderId}

### Deletar pedido

DELETE /order/{orderId}

## Executar o projeto

Instalar dependências:

npm install

Executar:

npm run dev

Servidor rodará em:

http://localhost:3000

## Documentação da API

http://localhost:3000/api-docs
