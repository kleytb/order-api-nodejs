const express = require("express");
const dotenv = require("dotenv");
const orderRoutes = require("./routes/orderRoutes.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/order", orderRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada"
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;