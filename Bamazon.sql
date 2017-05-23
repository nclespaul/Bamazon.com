CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE products (
	item_id INTEGER NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL
    );
    
    INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES (1, "Lawn Mower", "Home and Garden", 299.99, 100);    
    INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES (2, "Knife Set", "Home and Garden", 89.99, 50);
    INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES (3, "Computer Desk", "Home Office", 149.99, 20);
    INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES (4, "Car Tire", "Automotive", 129.95, 40);
    INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES (5, "Leather Jacket", "Clothing", 89.99, 11);
    INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES (6, "Playstation 4", "Electronics", 299.99, 15);
    INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES (7, "Electric Guitar", "Electronics", 1299.99, 10);
    INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES (8, "Kayak", "Outdoors", 295.99, 6);
    INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES (9, "Canned Dog Food - Case", "Pet Supplies", 21.99, 25);
    INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES (10, "Backpack", "School Supplies", 49.99, 8);