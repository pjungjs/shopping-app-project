const express = require('express');
const customers = express.Router();

const { 
  getAllCustomers,
  getOneCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer
} = require('../queries/customers.js');

//index route
customers.get('/', async (req, res) => {
  const allCustomers = await getAllCustomers();

  if (allCustomers.success) {
    res.status(200).json(allCustomers.payload);
  } else {
    res.status(400).json({ error: `Error: ${allCustomers.payload}` });
  }
})

//show route
customers.get('/:id', async (req, res) => {
  const { id } = req.params;
  const oneCustomer = await getOneCustomer(id);

  if (oneCustomer.success) {
    res.status(200).json(oneCustomer.payload);
  } else {
    res.status(400).json({ error: `Error: ${oneCustomer.payload}` });
  }
})

//create route
customers.post('/', async (req, res) => {
  const newCustomer = req.body;
  const createdCustomer = await createCustomer(newCustomer);

  if (createdCustomer.success) {
    res.status(200).json(createdCustomer.payload);
  } else {
    res.status(400).json({ error: `Error: ${createdCustomer.payload}` });
  }
})

//delete route
customers.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedCustomer = await deleteCustomer(id);

  if (deletedCustomer.success) {
    res.status(200).json(deletedCustomer.payload);
  } else {
    res.status(400).json({ error: `Error: ${deletedCustomer.payload}` });
  }
})

//update route
customers.put('/:id', async (req, res) => {
  const { id } = req.params;
  const editCustomer = req.body;
  const updatedCustomer = await updateCustomer(id, editCustomer);

  if (updatedCustomer.success) {
    res.status(200).json(updatedCustomer.payload);
  } else {
    res.status(400).json({ error: `Error: ${updatedCustomer.payload}` });
  }
})


module.exports = customers;