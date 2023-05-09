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
    firstName,
    lastName,
    email,
    phone,
    addressStreet,
    addressStreet2,
    addressCity,
    addressState,
    addressPostalCode,
    paymentInfo
  } = customerToAdd;

  try {
    const newCustomer = await db.one(
      "INSERT INTO customers (firstName, lastName, email, phone, addressStreet, addressStreet2, addressCity, addressState, addressPostalCode, paymentInfo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;",
      [firstName, lastName, email, phone, addressStreet, addressStreet2, addressCity, addressState, addressPostalCode, paymentInfo]
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
    firstName,
    lastName,
    email,
    phone,
    addressStreet,
    addressStreet2,
    addressCity,
    addressState,
    addressPostalCode,
    paymentInfo
  } = customerToUpdate;

  try {
    const updatedCustomer = await db.one(
      "UPDATE customers SET firstName=$1, lastName=$2, email=$3, phone=$4, addressStreet=$5, addressStreet2=$6, addressCity=$7, addressState=$8, addressPostalCode=$9, paymentInfo=$10 WHERE id=$11 RETURNING *;",
      [firstName, lastName, email, phone, addressStreet, addressStreet2, addressCity, addressState, addressPostalCode, paymentInfo, id]
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