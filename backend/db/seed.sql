-- psql -U postgres -f db/seed.sql

\c shopcart_dev;

INSERT INTO customers
(firstName, lastName, email, phone, addressStreet, addressStreet2, addressCity, addressState, addressPostalCode, paymentInfo)
VALUES
('John', 'Smith', 'john@example.com', '(212) 555-1234', '123 Main St', 'Apt 1', 'Anytown', 'CA', '12345', 'Visa ending in 1234'),
('Jane', 'Doe', 'jane@example.com', '(718) 555-5678', '456 Oak Ave', NULL, 'Another City', 'NY', '67890', 'Mastercard ending in 5678'),
('Bob', 'Johnson', 'bob@example.com', '(347) 555-9012', '789 Elm St', 'Suite 3', 'Someplace', 'TX', '23456', 'American Express ending in 9012');

INSERT INTO products 
(name, description, imageURL, price, quantityInStock, cardID, cardRarity, productUPC)
VALUES
('Roronoa Zoro', 'Supernovas/Straw Hat Crew', 'placeholder112/OP01-001.jpg', 7.95, 60, 'OP01-001', 'Leader', 'none'),
('Trafalgar Law', 'Supernovas/Heart Pirates', 'placeholder112/OP01-002.jpg', 3.95, 27, 'OP01-002', 'Leader', 'none'),
('Monkey. D. Luffy', 'Supernovas/Straw Hat Crew', 'placeholder112/OP01-003.jpg', 6.84, 78, 'OP01-003', 'Leader', 'none'),
('Usopp', 'Straw Hat Crew', 'placeholder112/OP01-004.jpg', 0.65, 43, 'OP01-004', 'Rare', 'none'),
('Uta', 'FILM', 'placeholder112/OP01-005.jpg', 9.98, 20, 'OP01-005', 'Rare', 'none'),
('Otama', 'Wano Country', 'placeholder112/OP01-006.jpg', 6.10, 72, 'OP01-006', 'Uncommon', 'none'),
('Caribou', 'Supernovas/Caribou Pirates', 'placeholder112/OP01-007.jpg', 2.09, 22, 'OP01-007', 'Common', 'none'),
('Cavendish', 'Supernovas/Beautiful Pirates', 'placeholder112/OP01-008.jpg', 3.44, 90, 'OP01-008', 'Common', 'none'),
('Carrot', 'Mink Tribe', 'placeholder112/OP01-009.jpg', 5.31, 94, 'OP01-009', 'Common', 'none'),
('Komachiyo', 'Animal/Wano Country', 'placeholder112/OP01-010.jpg', 8.39, 43, 'OP01-010', 'Common', 'none'),
('Gordon', 'FILM', 'placeholder112/OP01-011.jpg', 3.29, 78, 'OP01-011', 'Uncommon', 'none'),
('Sai', 'Happosui Army', 'placeholder112/OP01-012.jpg', 8.19, 9, 'OP01-012', 'Common', 'none'),
('Sanji', 'Straw Hat Crew', 'placeholder112/OP01-013.jpg', 1.11, 48, 'OP01-013', 'Common', 'none'),
('Jinbe', 'Fish-Man/Straw Hat Crew', 'placeholder112/OP01-014.jpg', 1.79, 14, 'OP01-014', 'Uncommmon', 'none'),
('Tony Tony.Chopper', 'Animal/Straw Hat Crew', 'placeholder112/OP01-015.jpg', 3.81, 18, 'OP01-015', 'Uncommon', 'none'),
('Nami', 'Straw Hat Crew', 'placeholder112/OP01-016.jpg', 6.68, 78, 'OP01-016', 'Rare', 'none'),
('Nico Robin', 'Straw Hat Crew', 'placeholder112/OP01-017.jpg', 8.50, 0, 'OP01-017', 'Common', 'none'),
('Hajrudin', 'Giants/New Giant Warrior Pirates', 'placeholder112/OP01-018.jpg', 1.87, 55, 'OP01-018', 'Common', 'none'),
('Bartolomeo', 'Supernovas/Barto Club', 'placeholder112/OP01-019.jpg', 3.59, 19, 'OP01-019', 'Common', 'none'),
('Hyogoro', 'Wano Country', 'placeholder112/OP01-020.jpg', 8.07, 34, 'OP01-020', 'Common', 'none'),
('Franky', 'Straw Hat Crew', 'placeholder112/OP01-021.jpg', 6.64, 46, 'OP01-021', 'Uncommon', 'none'),
('Brook', 'Straw Hat Crew', 'placeholder112/OP01-022.jpg', 5.35, 23, 'OP01-022', 'Uncommon', 'none'),
('Marco', 'Former White Beard Pirates', 'placeholder112/OP01-023.jpg', 9.73, 21, 'OP01-023', 'Common', 'none'),
('Monkey D. Luffy', 'Supernovas/Straw Hat Crew', 'placeholder112/OP01-024.jpg', 1.15, 66, 'OP01-024', 'Super Rare', 'none'),
('Roronoa Zoro', 'Supernovas/Straw Hat Crew', 'placeholder112/OP01-025.jpg', 0.90, 15, 'OP01-025', 'Super Rare', 'none'),
('Gum Gum Red Hawk', 'Supernovas/Straw Hat Crew', 'placeholder112/OP01-026.jpg', 2.97, 36, 'OP01-026', 'Rare', 'none'),
('Round Table', 'Supernovas/Straw Hat Crew', 'placeholder112/OP01-027.jpg', 7.7, 84, 'OP01-027', 'Common', 'none'),
('Green Star: Rafflesia', 'Straw Hat Crew', 'placeholder112/OP01-028.jpg', 2.74, 72, 'OP01-028', 'Common', 'none'),
('Radical Beam!!', 'Supernovas/Straw Hat Crew', 'placeholder112/OP01-029.jpg', 7.95, 94, 'OP01-029', 'Uncommon', 'none'),
('In Two Years!! At the Sabaody Archipelago!!', 'Straw Hat Crew', 'placeholder112/OP01-030.jpg', 1.61, 86, 'OP01-030', 'Uncommon', 'none'),
('Kozuki Oden', 'Wano Country/Kozuki Family', 'placeholder112/OP01-031.jpg', 3.06, 56, 'OP01-031', 'Leader', 'none'),
('Ashura Doji', 'Wano Country/Nine Red Scabbards', 'placeholder112/OP01-032.jpg', 6.33, 83, 'OP01-032', 'Uncommon', 'none'),
('Izou', 'Wano Country / Former White Beard Pirates', 'placeholder112/OP01-033.jpg', 5.86, 26, 'OP01-033', 'Uncommon', 'none'),
('Inuarashi', 'Mink Tribe/Wano Country/Nine Red Scabbards', 'placeholder112/OP01-034.jpg', 0.62, 59, 'OP01-034', 'Common', 'none'),
('Okiku', 'Wano Country/Nine Red Scabbards', 'placeholder112/OP01-035.jpg', 2.71, 94, 'OP01-035', 'Rare', 'none'),
('Otsuru', 'Wano Country', 'placeholder112/OP01-036.jpg', 7.37, 89, 'OP01-036', 'Common', 'none'),
('Kawamatsu', 'Fish-Man/Wano Country/Nine Red Scabbards', 'placeholder112/OP01-037.jpg', 2.92, 81, 'OP01-037', 'Common', 'none'),
('Kanjuro', 'Wano Country/Nine Red Scabbards', 'placeholder112/OP01-038.jpg', 2.01, 20, 'OP01-038', 'Common', 'none'),
('Killer', 'Supernovas/Kid Pirates', 'placeholder112/OP01-039.jpg', 9.32, 97, 'OP01-039', 'Uncommon', 'none'),
('Kin''emon', 'Wano Country/Nine Red Scabbards', 'placeholder112/OP01-040.jpg', 1.43, 55, 'OP01-040', 'Super Rare', 'none'),
('Kozuki Momonosuke', 'Wano Country/Kozuki Family', 'placeholder112/OP01-041.jpg', 5.20, 73, 'OP01-041', 'Rare', 'none'),
('Komurasaki', 'Wano Country/Kozuki Family', 'placeholder112/OP01-042.jpg', 2.02, 95, 'OP01-042', 'Uncommon', 'none'),
('Shinobu', 'Wano Country', 'placeholder112/OP01-043.jpg', 2.58, 37, 'OP01-043', 'Common', 'none'),
('Shachi', 'Heart Pirates', 'placeholder112/OP01-044.jpg', 9.67, 26, 'OP01-044', 'Common', 'none'),
('Jean Bart', 'Heart Pirates', 'placeholder112/OP01-045.jpg', 8.93, 84, 'OP01-045', 'Common', 'none'),
('Denjiro', 'Wano Country/Nine Red Scabbards', 'placeholder112/OP01-046.jpg', 1.88, 81, 'OP01-046', 'Rare', 'none'),
('Trafalgar Law', 'Supernovas/Heart Pirates', 'placeholder112/OP01-047.jpg', 6.02, 85, 'OP01-047', 'Super Rare', 'none'),
('Cat Viper', 'Mink Tribe/Wano Country/Nine Red Scabbards', 'placeholder112/OP01-048.jpg', 1.10, 19, 'OP01-048', 'Common', 'none'),
('Bepo', 'Mink Tribe/Heart Pirates', 'placeholder112/OP01-049.jpg', 0.53, 52, 'OP01-049', 'Rare', 'none'),
('Penguin', 'Heart Pirates', 'placeholder112/OP01-050.jpg', 8.98, 94, 'OP01-050', 'Common', 'none');

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
