const db = require('../db/dbConfig.js');

//index query
const getAllCustomers = async () => {
  try {
    const allCustomers = await db.any("SELECT * FROM customers");
    return { success: true, payload: allCustomers };
  } catch (error) {
    return { success: false, payload: error };
  }
}

//show query
const getOneCustomer = async (id) => {
  try {
    const oneCustomer = await db.one("SELECT * FROM customers WHERE id=$1;", id);
    return { success: true, payload: oneCustomer };
  } catch (error) {
    return { success: false, payload: error };
  }
}

//create query
const createCustomer = async (customerToAdd) => {
  const { 
    first_name,
    last_name,
    email,
    phone,
    address_street,
    address_street2,
    address_city,
    address_state,
    address_postal_code,
    payment_info
  } = customerToAdd;

  try {
    const newCustomer = await db.one(
      "INSERT INTO customers (first_name, last_name, email, phone, address_street, address_street2, address_city, address_state, address_postal_code, payment_info) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;",
      [first_name, last_name, email, phone, address_street, address_street2, address_city, address_state, address_postal_code, payment_info]
    );
    return { success: true, payload: newCustomer };
  } catch (error) {
    return { success: false, payload: error };
  }
}

//delete query
const deleteCustomer = async (id) => {
  try {
    const deletedCustomer = await db.one("DELETE FROM customers WHERE id=$1 RETURNING *;", id);
    return { success: true, payload: deletedCustomer };
  } catch (error) {
    return { success: false, payload: error };
  }
}

//update query
const updateCustomer = async (id, customerToUpdate) => {
  const { 
    first_name,
    last_name,
    email,
    phone,
    address_street,
    address_street2,
    address_city,
    address_state,
    address_postal_code,
    payment_info
  } = customerToUpdate;

  try {
    const updatedCustomer = await db.one(
      "UPDATE customers SET first_name=$1, last_name=$2, email=$3, phone=$4, address_street=$5, address_street2=$6, address_city=$7, address_state=$8, address_postal_code=$9, payment_info=$10 WHERE id=$11 RETURNING *;",
      [first_name, last_name, email, phone, address_street, address_street2, address_city, address_state, address_postal_code, payment_info, id]
    );
    return { success: true, payload: updatedCustomer };
  } catch (error) {
    return { success: false, payload: error };
  }
}


module.exports = {
  getAllCustomers,
  getOneCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer
};