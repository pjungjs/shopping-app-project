const db = require("../db/dbConfig.js");

// GET ALL
const getAllProducts = async () => {
    try {
        const allProducts = await db.any("SELECT * FROM products");
        return {success: true, payload: allProducts};
    } catch (error) {
        return {success: false, payload: error};
    }
};

// GET ONE
const getProduct = async (id) => {
    try {
        const oneProduct = await db.one("SELECT * FROM products WHERE id=$1", id);
        return {success: true, payload: oneProduct};
    } catch (error) {
        return {success: false, payload: error};
    }
};

// CREATE
const createProduct = async (product) => {
    try {
        const newProduct = await db.one(
            "INSERT INTO products (name, description, image_url, price, quantity_in_stock, card_id, card_rarity, product_upc) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [product.name, product.description, product.image_url, product.price, product.quantity_in_stock, product.card_id, product.card_rarity, product.product_upc]
        );
        return {success: true, payload: newProduct};
    } catch (error) {
        return {success: false, payload: error};
    }
};

// DELETE
const deleteProduct= async (id) => {
    try {
        const deletedProduct = await db.one(
            "DELETE FROM products WHERE id = $1 RETURNING *",
            id
        );
        return {success: true, payload: deletedProduct};
    } catch (error) {
        return {success: false, payload: error};
    }
};

// UPDATE
const updateProduct = async (id, product) => {
    try {
        const updatedProduct = await db.one(
            "UPDATE products SET name=$1, description=$2, image_url=$3, price=$4, quantity_in_stock=$5, card_id=$6, card_rarity=$7, product_upc=$8 WHERE id=$9 RETURNING *",
            [product.name, product.description, product.image_url, product.price, product.quantity_in_stock, product.card_id, product.card_rarity, product.product_upc, id]
        );
        return {success: true, payload: updatedProduct};
    } catch (error) {
        return {success: false, payload: error};
    }
};

module.exports = { getAllProducts, createProduct, getProduct, deleteProduct, updateProduct };