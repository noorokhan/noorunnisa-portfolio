-- Create database
CREATE DATABASE Inventory_ClientName;
USE Inventory_ClientName;

-- Create Supplier_info table
CREATE TABLE Supplier_info (
    SupplierID INT PRIMARY KEY,
    SupplierName VARCHAR(100),
    Region VARCHAR(50)
);

-- Create Product_info table
CREATE TABLE Product_info (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(150),
    Category VARCHAR(50),
    SupplierID INT,
    UnitsInStock INT,
    UnitPrice DECIMAL(10,2),
    FOREIGN KEY (SupplierID) REFERENCES Supplier_info(SupplierID)
);

-- Insert Supplier data
INSERT INTO Supplier_info VALUES
(10, 'Far East Imports', 'Asia'),
(20, 'America Arts', 'North America'),
(30, 'Kenya Crafts', 'Africa'),
(40, 'Rainforest Cooperative', 'Central America');

-- Insert Product data
INSERT INTO Product_info VALUES
(111, 'Ebony Carving', 'Art', 30, 120, 120.00),
(122, 'Talking Drum', 'Instrument', 30, 9, 55.00),
(123, 'Carved Polar Bear', 'Art', 20, 15, 250.00),
(136, 'Lacquer Dinner Set', 'Household', 10, 13, 85.00),
(137, 'Turquoise Earrings', 'Jewelry', 20, 5, 15.00),
(148, 'Opal Earrings', 'Jewelry', 10, 7, 110.00),
(189, 'Smoked Salmon', 'Food', 20, 15, 25.95),
(324, 'Hippo Carving', 'Art', 30, 15, 180.00),
(357, 'Maple Sugar Treats', 'Food', 20, 15, 80.50),
(552, 'Aztec Mask', 'Art', 40, 8, 55.00),
(554, 'Mahogany Salad Bowl', 'Household', 40, 8, 22.95),
(773, 'Hand Pipes', 'Instrument', 40, 18, 95.00),
(797, 'Jade Ring', 'Jewelry', 10, 8, 40.00),
(811, 'Soapstone Seal', 'Art', 20, 4, 300.00),
(986, 'Coral Pendant', 'Jewelry', 10, 9, 220.00);

-- Query 1: Question_1
SELECT ProductName, Category
FROM Product_info;

-- Query 2: Large Price
SELECT ProductName, Category
FROM Product_info
WHERE UnitPrice > 100.00;

-- Query 3: Carving_Products
SELECT ProductName, Category, UnitsInStock, UnitPrice
FROM Product_info
WHERE ProductName LIKE '%Carving%';

-- Query 4: Low_Stock
SELECT ProductName, Category
FROM Product_info
WHERE SupplierID = 20 AND UnitsInStock < 15;

-- Query 5: Art_North_America
SELECT ProductName, Category
FROM Product_info
WHERE Category = 'Art' OR SupplierID = 20
ORDER BY ProductName DESC;

-- Query 6: Products_Suppliers
SELECT p.ProductName, p.Category, p.SupplierID,
       s.SupplierName, s.Region
FROM Product_info p
JOIN Supplier_info s
ON p.SupplierID = s.SupplierID;
