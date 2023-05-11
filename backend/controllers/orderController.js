const express = require("express");
const orders = express.Router({ mergeParams: true });
const {
  getAllOrders,
  getOrdersByCustomer,
  createOrder,
  deleteOrder,
  updateOrder,
} = require("../queries/orders");

// INDEX SHOW ALL
orders.get("/", async (req, res) => {
  const allOrders = await getAllOrders();
  if (allOrders.success) {
    res.status(200).json(allOrders.payload);
  } else {
    res.status(400).json({error: `Error: ${allOrders.payload}`})
  }
});

// SHOW ALL BY CUSTOMER
orders.get("/:id", async (req, res) => {
  const { id } = req.params;
  const order = await getOrdersByCustomer(id);
  if (order.success) {
    res.status(200).json(order.payload);
  } else {
    res.status(404).json({ error: `Error: ${order.payload}` });
  }
});

// CREATE
orders.post("/", async (req, res) => {
  const order = await createOrder(req.body);
  if (order.success) {
    res.status(200).json(order.payload);
  } else {
    res.status(400).json({error: `Error: ${order.payload}`})
  }
});

// DELETE
orders.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedOrder = await deleteOrder(id);
  if (deletedOrder.success) {
    res.status(200).json(deletedOrder.payload);
  } else {
    res.status(400).json({error: `Error: ${deletedOrder.payload}`});
  }
});

// UPDATE
orders.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedOrder = await updateOrder(id, req.body);
  if (updatedOrder.success) {
    res.status(200).json(updatedOrder.payload);
  } else {
    res.status(400).json({error: `Error: ${updatedOrder.payload}`})
  }
}); 

module.exports = orders;