const Order = require("../models/Order");
const { mapRequestToOrder } = require("../utils/mapper");

function validateOrderPayload(body) {
  if (!body.numeroPedido) {
    return "O campo numeroPedido é obrigatório.";
  }

  if (body.valorTotal === undefined) {
    return "O campo valorTotal é obrigatório.";
  }

  if (!body.dataCriacao) {
    return "O campo dataCriacao é obrigatório.";
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return "O campo items deve ser um array com ao menos 1 item.";
  }

  for (const item of body.items) {
    if (!item.idItem || item.quantidadeItem === undefined || item.valorItem === undefined) {
      return "Cada item deve conter idItem, quantidadeItem e valorItem.";
    }
  }

  return null;
}

async function createOrder(req, res) {
  try {
    const validationError = validateOrderPayload(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const mappedOrder = mapRequestToOrder(req.body);

    if (!mappedOrder.orderId) {
      return res.status(400).json({ error: "numeroPedido inválido." });
    }

    const existingOrder = await Order.findOne({ orderId: mappedOrder.orderId });
    if (existingOrder) {
      return res.status(409).json({
        error: "Já existe um pedido com esse orderId."
      });
    }

    const order = await Order.create(mappedOrder);

    return res.status(201).json({
      message: "Pedido criado com sucesso.",
      data: order
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno ao criar pedido.",
      details: error.message
    });
  }
}

async function getOrderById(req, res) {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        error: "Pedido não encontrado."
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno ao buscar pedido.",
      details: error.message
    });
  }
}

async function listOrders(req, res) {
  try {
    const orders = await Order.find();

    return res.status(200).json({
      total: orders.length,
      data: orders
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno ao listar pedidos.",
      details: error.message
    });
  }
}

async function updateOrder(req, res) {
  try {
    const { orderId } = req.params;

    const validationError = validateOrderPayload(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const mappedOrder = mapRequestToOrder(req.body);

    const order = await Order.findOneAndUpdate(
      { orderId },
      mappedOrder,
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        error: "Pedido não encontrado."
      });
    }

    return res.status(200).json({
      message: "Pedido atualizado com sucesso.",
      data: order
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno ao atualizar pedido.",
      details: error.message
    });
  }
}

async function deleteOrder(req, res) {
  try {
    const { orderId } = req.params;

    const order = await Order.findOneAndDelete({ orderId });

    if (!order) {
      return res.status(404).json({
        error: "Pedido não encontrado."
      });
    }

    return res.status(200).json({
      message: "Pedido deletado com sucesso."
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno ao deletar pedido.",
      details: error.message
    });
  }
}

module.exports = {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder
};