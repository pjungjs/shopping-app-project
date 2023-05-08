-- psql -U postgres -f db/seed.sql

\c shopping_dev;

INSERT INTO customers
(firstName, lastName, email, phone, addressStreet, addressStreet2, addressCity, addressState, addressPostalCode, paymentInfo)
VALUES
('John', 'Smith', 'john@example.com', '(212) 555-1234', '123 Main St', 'Apt 1', 'Anytown', 'CA', '12345', 'Visa ending in 1234'),
('Jane', 'Doe', 'jane@example.com', '(718) 555-5678', '456 Oak Ave', NULL, 'Another City', 'NY', '67890', 'Mastercard ending in 5678'),
('Bob', 'Johnson', 'bob@example.com', '(347) 555-9012', '789 Elm St', 'Suite 3', 'Someplace', 'TX', '23456', 'American Express ending in 9012');


INSERT INTO products
(name, category, upc, price, weightInLb, quantityInStock, description, imageURL)
VALUES
('T-Shirt', 'Clothing', '123456789012', 19.99, 0.2, 100, 'Cotton t-shirt with logo', 'https://example.com/images/t-shirt.jpg'),
('Pants', 'Clothing', '234567890123', 29.99, 0.5, 50, 'Jeans with tapered fit', 'https://example.com/images/pants.jpg'),
('Sneakers', 'Footwear', '345678901234', 69.99, 1.2, 20, 'Classic white sneakers', 'https://example.com/images/sneakers.jpg'),
('Backpack', 'Accessories', '456789012345', 49.99, 1.0, 30, 'Water-resistant backpack with laptop sleeve', 'https://example.com/images/backpack.jpg'),
('Hoodie', 'Clothing', '567890123456', 39.99, 0.8, 70, 'Fleece hoodie with drawstring hood', 'https://example.com/images/hoodie.jpg'),
('Running Shoes', 'Footwear', '678901234567', 79.99, 1.4, 15, 'Lightweight running shoes', 'https://example.com/images/running-shoes.jpg'),
('Sunglasses', 'Accessories', '789012345678', 24.99, 0.1, 80, 'Classic aviator sunglasses', 'https://example.com/images/sunglasses.jpg'),
('Dress', 'Clothing', '890123456789', 49.99, 0.6, 40, 'Floral print wrap dress', 'https://example.com/images/dress.jpg'),
('Belt', 'Accessories', '901234567890', 14.99, 0.3, 60, 'Black leather belt with silver buckle', 'https://example.com/images/belt.jpg'),
('Sandals', 'Footwear', '012345678901', 34.99, 0.7, 25, 'Strappy sandals with cork sole', 'https://example.com/images/sandals.jpg'),
('Sweater', 'Clothing', '987654321098', 49.99, 0.9, 50, 'Chunky knit sweater with cable pattern', 'https://example.com/images/sweater.jpg'),
('Watch', 'Accessories', '876543210987', 89.99, 0.2, 10, 'Stainless steel watch with leather strap', 'https://example.com/images/watch.jpg'),
('Shorts', 'Clothing', '765432109876', 24.99, 0.3, 80, 'Denim shorts with frayed hem', 'https://example.com/images/shorts.jpg'),
('Loafers', 'Footwear', '654321098765', 59.99, 1.1, 20, 'Brown leather loafers', 'https://example.com/images/loafers.jpg');


INSERT INTO orders
(productId, customerId, productQty, date)
VALUES
(1, 1, 5, '2023-05-08'),
(2, 1, 3, '2023-05-08'),
(3, 2, 2, '2023-05-07'),
(4, 2, 1, '2023-05-07'),
(5, 1, 2, '2023-05-08'),
(6, 2, 1, '2023-05-07'),
(8, 1, 1, '2023-05-08'),
(9, 2, 1, '2023-05-07'),
(10, 1, 1, '2023-05-08'),
(11, 2, 1, '2023-05-07'),
(13, 1, 1, '2023-05-08'),
(12, 3, 1, '2023-05-09');
