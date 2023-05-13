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
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  email VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  address_street VARCHAR(60) NOT NULL,
  address_street2 VARCHAR(30),
  address_city VARCHAR(80) NOT NULL,
  address_state VARCHAR(40) NOT NULL,
  address_postal_code VARCHAR(40) NOT NULL,
  payment_info TEXT NOT NULL
);

-- Create a table for "products"
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(120) NOT NULL,
  image_url VARCHAR(120),
  price DECIMAL(10,2) NOT NULL CHECK (price >=0),
  quantity_in_stock INT NOT NULL CHECK (price >=0),
  card_id VARCHAR(12),
  card_rarity VARCHAR(18),
  product_upc CHAR(12)
);

-- Create a table for "orders"
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products (id) ON DELETE CASCADE,
  customer_id INT REFERENCES customers (id) ON DELETE CASCADE,
  product_qty INT NOT NULL,
  date DATE NOT NULL
);
