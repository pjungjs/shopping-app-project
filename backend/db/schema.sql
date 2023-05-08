-- psql -U postgres -f db/schema.sql

-- IF already exists, drop it.
DROP DATABASE IF EXISTS shopping_dev;

-- Create our database
CREATE DATABASE shopping_dev;

-- Connect to the db
\c shopping_dev;

-- Create a table for "customers"
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(80) NOT NULL,
  lastName VARCHAR(80) NOT NULL,
  email VARCHAR(120) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  addressStreet VARCHAR(40) NOT NULL,
  addressStreet2 VARCHAR(40),
  addressCity VARCHAR(80) NOT NULL,
  addressState VARCHAR(40) NOT NULL,
  addressPostalCode VARCHAR(40) NOT NULL,
  paymentInfo TEXT NOT NULL
);

-- Create a table for "products"
CREATE TABLE products {
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  category TEXT,
  upc CHAR(12),
  price DECIMAL(10,2) NOT NULL,
  weightInLb DECIMAL(5,1),
  quantityInStock INT NOT NULL,
  description VARCHAR(40) NOT NULL,
  imageURL VARCHAR(120)
}

-- Create a table for "orders"
CREATE TABLE orders {
  id SERIAL PRIMARY KEY,
  productId INTEGER REFERENCES products (id) ON DELETE CASCADE
  customerId INTEGER REFERENCES customers (id) ON DELETE CASCADE
  productQty INT NOT NULL,
  date DATE NOT NULL
}
