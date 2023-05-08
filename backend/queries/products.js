const db = require("../db/dbConfig.js");

// GET ALL
const getAllProducts = async () => {
    try {
        const allProducts = await db.any("SELECT * FROM products");
        return allProducts;
    } catch (error) {
        return error;
    }
};

// GET ONE
const getProduct = async (id) => {
    try {
        const oneProduct = await db.one("SELECT * FROM products WHERE id=$1", id);
        return oneProduct;
    } catch (error) {
        return error;
    }
};

// CREATE
const createProduct = async (product) => {
    try {
        const newProduct = await db.one(
            "INSERT INTO products (name, description, imageURL, price, quantityInStock, cardID, cardRarity, productUPC) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [product.name, product.description, product.imageURL, product.price, product.quantityInStock, product.cardID, product.cardRarity, product.productUPC]
        );
        return newProduct;
    } catch (error) {
        return error;
    }
};

// DELETE
const deleteProduct= async (id) => {
    try {
        const deletedProduct = await db.one(
            "DELETE FROM products WHERE id = $1 RETURNING *",
            id
        );
        return deletedProduct;
    } catch (error) {
        return error;
    }
};

// UPDATE
const updateProduct = async (id, product) => {
    try {
        const updatedProduct = await db.one(
            "UPDATE products SET name=$1, description=$2, imageURL=$3, price=$4, quantityInStock=$5, cardID=$6, cardRarity=$7, productUPC=$8 WHERE id=$9 RETURNING *",
            [product.name, product.description, product.imageURL, product.price, product.quantityInStock, product.cardID, product.cardRarity, product.productUPC, id]
        );
        return updatedProduct;
    } catch (error) {
        return error;
    }
};

module.exports = { getAllProducts, createProduct, getProduct, deleteProduct, updateProduct };