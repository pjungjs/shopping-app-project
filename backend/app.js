// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

const productController = require("./controllers/productController.js");
const customerController = require("./controllers/customerController.js");

app.use("/products", productController);
app.use("/customers", customerController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Shopping-App-Project");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});
// EXPORT
module.exports = app;