function extractOrderId(numeroPedido) {
  if (!numeroPedido || typeof numeroPedido !== "string") {
    return null;
  }

  return numeroPedido.split("-")[0];
}

function mapRequestToOrder(body) {
  return {
    orderId: extractOrderId(body.numeroPedido),
    value: body.valorTotal,
    creationDate: new Date(body.dataCriacao),
    items: Array.isArray(body.items)
      ? body.items.map((item) => ({
          productId: Number(item.idItem),
          quantity: item.quantidadeItem,
          price: item.valorItem
        }))
      : []
  };
}

module.exports = {
  mapRequestToOrder,
  extractOrderId
};