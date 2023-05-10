const express = require("express");
const products = express.Router({ mergeParams: true });
const {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../queries/products");

// INDEX SHOW ALL
products.get("/", async (req, res) => {
  const allProducts = await getAllProducts();
  if (allProducts.success) {
    res.status(200).json(allProducts.payload);
  } else {
    res.status(400).json({error: `Error: ${allProducts.payload}`})
  }
});

// SHOW ONE
products.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await getProduct(id);
  if (product.success) {
    res.status(200).json(product.payload);
  } else {
    res.status(404).json({ error: `Error: ${product.payload}` });
  }
});

// CREATE
products.post("/", async (req, res) => {
  const product = await createProduct(req.body);
  if (product.success) {
    res.status(200).json(product.payload);
  } else {
    res.status(400).json({error: `Error: ${product.payload}`})
  }
});

// DELETE
products.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await deleteProduct(id);
  if (deletedProduct.success) {
    res.status(200).json(deletedProduct.payload);
  } else {
    res.status(400).json({error: `Error: ${deletedProduct.payload}`});
  }
});

// UPDATE
products.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await updateProduct(id, req.body);
  if (updatedProduct.success) {
    res.status(200).json(updatedProduct.payload);
  } else {
    res.status(400).json({error: `Error: ${updatedProduct.payload}`})
  }
}); 

module.exports = products;