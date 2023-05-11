const db = require("../db/dbConfig.js");

// GET ALL
const getAllOrders = async () => {
    try {
        const allOrders = await db.any("SELECT * FROM orders");
        return {success: true, payload: allOrders};
    } catch (error) {
        return {success: false, payload: error};
    }
};

// GET ONE
// const getOrder = async (id) => {
//     try {
//         const oneOrder = await db.one("SELECT * FROM orders WHERE id=$1", id);
//         return {success: true, payload: oneOrder};
//     } catch (error) {
//         return {success: false, payload: error};
//     }
// };

// GET ALL BY CUSTOMER
const getOrdersByCustomer = async (id) => {
    try {
        const oneOrderByCustomer = await db.any("SELECT * FROM orders WHERE customer_id=$1", id);
        return {success: true, payload: oneOrderByCustomer};
    } catch (error) {
        return {success: false, payload: error};
    }
};

// CREATE
const createOrder = async (order) => {
    try {
        const newOrder = await db.one(
            "INSERT INTO orders (product_id, customer_id, product_qty, date) VALUES($1, $2, $3, $4) RETURNING *",
            [order.product_id, order.customer_id, order.product_qty, order.date]
        );
        return {success: true, payload: newOrder};
    } catch (error) {
        return {success: false, payload: error};
    }
};

// DELETE
const deleteOrder= async (id) => {
    try {
        const deletedOrder = await db.one(
            "DELETE FROM orders WHERE id = $1 RETURNING *",
            id
        );
        return {success: true, payload: deletedOrder};
    } catch (error) {
        return {success: false, payload: error};
    }
};

// UPDATE
const updateOrder = async (id, order) => {
    try {
        const updatedOrder = await db.one(
            "UPDATE orders SET product_id=$1, customer_id=$2, product_qty=$3, date=$4 WHERE id=$5 RETURNING *",
            [order.product_id, order.customer_id, order.product_qty, order.date, id]
        );
        return {success: true, payload: updatedOrder};
    } catch (error) {
        return {success: true, payload: error};
    }
};

module.exports = { getAllOrders, getOrdersByCustomer, createOrder, deleteOrder, updateOrder };