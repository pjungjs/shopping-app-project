const express = require("express");
const products = express.Router({mergeParams: true });
const {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../queries/products");

// INDEX SHOW ALL
products.get("/", async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    res.json(allProducts);
  } catch (err) {
    res.json(err);
  }
});

// SHOW ONE
products.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await getProduct(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
products.post("/", async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// DELETE
products.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await deleteProduct(id);
  if (deletedProduct.id) {
    res.status(200).json(deletedProduct);
  } else {
    res.status(404).json("Product not found");
  }
});

// UPDATE
products.put("/:id",async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await updateProduct(id, req.body);
  res.status(200).json(updatedProduct);
});

module.exports = products;