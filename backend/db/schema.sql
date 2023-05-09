-- psql -U postgres -f db/schema.sql

-- IF already exists, drop it.
DROP DATABASE IF EXISTS shopcart_dev;

-- Create our database
CREATE DATABASE shopcart_dev;

-- Connect to the db
\c shopcart_dev;

-- Create a table for "customers"
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(80) NOT NULL,
  lastName VARCHAR(80) NOT NULL,
  email VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  addressStreet VARCHAR(60) NOT NULL,
  addressStreet2 VARCHAR(30),
  addressCity VARCHAR(80) NOT NULL,
  addressState VARCHAR(40) NOT NULL,
  addressPostalCode VARCHAR(40) NOT NULL,
  paymentInfo TEXT NOT NULL
);

-- Create a table for "products"
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(120) NOT NULL,
  imageURL VARCHAR(120),
  price DECIMAL(10,2) NOT NULL,
  quantityInStock INT NOT NULL,
  cardID VARCHAR(12),
  cardRarity VARCHAR(18),
  productUPC CHAR(12)
);

-- Create a table for "orders"
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  productId INT REFERENCES products (id) ON DELETE CASCADE,
  customerId INT REFERENCES customers (id) ON DELETE CASCADE,
  productQty INT NOT NULL,
  date DATE NOT NULL
);
