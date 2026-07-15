USE ECommerce

DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Order_Details;


-- 1. CREATION OF THE CUSTOMERS TABLE
CREATE TABLE Customers (
    customer_id INT IDENTITY(1,1),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    shipping_address TEXT NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    PRIMARY KEY (customer_id)
);

-- 2. CREATION OF THE PRODUCTS TABLE
CREATE TABLE Products (
    product_id INT IDENTITY(1,1),
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    category VARCHAR(50),
    PRIMARY KEY (product_id)
);

-- 3. CREATION OF THE ORDERS TABLE (HEADER)
CREATE TABLE Orders (
    order_id INT IDENTITY(1,1),
    customer_id INT NOT NULL,
    order_date DATETIME2 DEFAULT GETDATE(),
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    PRIMARY KEY (order_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

-- 4. CREATION OF THE ORDER_DETAILS TABLE (JUNCTION TABLE)
CREATE TABLE Order_Details (
    order_detail_id INT IDENTITY(1,1),
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (order_detail_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

-- 1. INSERT MOCK DATA INTO CUSTOMERS
INSERT INTO Customers (first_name, last_name, email, phone, shipping_address)
VALUES 
('John', 'Doe', 'john.doe@email.com', '555-0192', '123 Maple Street, Springfield, OR 97477'),
('Jane', 'Smith', 'jane.smith@email.com', '555-0143', '456 Oak Avenue, Riverdale, NY 10471'),
('Carlos', 'Santana', 'carlos.s@email.com', '555-0188', '789 Pine Road, Austin, TX 78701'),
('Emily', 'Watson', 'emily.w@email.com', '555-0122', '321 Elm Dr, Seattle, WA 98101');

-- 2. INSERT MOCK DATA INTO PRODUCTS
INSERT INTO Products (product_name, description, price, stock, category)
VALUES 
('Wireless Mouse', 'Ergonomic 2.4GHz wireless computer mouse.', 24.99, 150, 'Electronics'),
('Mechanical Keyboard', 'RGB backlit mechanical keyboard with blue switches.', 79.99, 45, 'Electronics'),
('Leather Backpack', 'Water-resistant vintage style laptop backpack.', 49.99, 30, 'Apparel'),
('Stainless Steel Bottle', 'Vacuum insulated 32oz water bottle.', 19.99, 200, 'Home & Kitchen'),
('Running Shoes', 'Lightweight breathable athletic sneakers.', 89.99, 12, 'Apparel');

-- 3. INSERT MOCK DATA INTO ORDERS (Headers)
-- Note: Assuming customer_id values generated are 1, 2, 3, and 4.
INSERT INTO Orders (customer_id, total_amount, status)
VALUES 
(1, 104.98, 'Shipped'),
(2, 19.99, 'Delivered'),
(3, 169.98, 'Pending'),
(1, 49.99, 'Processing');

-- 4. INSERT MOCK DATA INTO ORDER_DETAILS (Junction Table)
-- Note: Replicates the items that build up the 'total_amount' in the Orders table.
INSERT INTO Order_Details (order_id, product_id, quantity, unit_price)
VALUES 
-- Order 1 items (Total: 104.98)
(1, 1, 1, 24.99), -- 1 Wireless Mouse
(1, 2, 1, 79.99), -- 1 Mechanical Keyboard

-- Order 2 items (Total: 19.99)
(2, 4, 1, 19.99), -- 1 Stainless Steel Bottle

-- Order 3 items (Total: 169.98)
(3, 5, 1, 89.99), -- 1 Running Shoes
(3, 2, 1, 79.99), -- 1 Mechanical Keyboard

-- Order 4 items (Total: 49.99)
(4, 3, 1, 49.99); -- 1 Leather Backpack

-- 1.Inner join
SELECT 
    o.order_id, 
    c.first_name, 
    c.last_name, 
    o.total_amount
FROM Orders o
INNER JOIN Customers c ON o.customer_id = c.customer_id;

--2.  left join 
SELECT 
    c.customer_id, 
    c.first_name, 
    c.last_name, 
    o.order_id, 
    o.total_amount
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id;


--3. right join
SELECT 
    o.order_id, 
    o.total_amount, 
    c.first_name, 
    c.last_name
FROM Customers c
RIGHT JOIN Orders o ON c.customer_id = o.customer_id;

--4. GROUP BY/HAVING
--4.1. Find categories with more than 1 product
SELECT 
    category, 
    COUNT(product_id) AS total_products
FROM Products
GROUP BY category
HAVING COUNT(product_id) > 1;

--4.2. Find customers who spent over $100 in total
SELECT 
    customer_id, 
    SUM(total_amount) AS total_spent
FROM Orders
GROUP BY customer_id
HAVING SUM(total_amount) > 100.00;

--5. Subqueries
--5.1. Subqueries - Scalar Subquery (Find products priced above average)
SELECT product_name, price
FROM Products
WHERE price > (SELECT AVG(price) FROM Products);


--5.2. Subqueries - Correlated Subquery (Find the latest order for each customer)
SELECT o1.customer_id, o1.order_id, o1.order_date
FROM Orders o1
WHERE o1.order_date = (
    SELECT MAX(o2.order_date) 
    FROM Orders o2 
    WHERE o2.customer_id = o1.customer_id
);
 
--6. Window functions
--6.1 Window functions - Row number - Sequential integer starting at 1 per customer
SELECT 
    customer_id,
    order_date,
    total_amount, 
    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_sequence
FROM Orders;

--6.2 Window functions - Rank - Ranks orders by transaction size (ties get the same rank)
SELECT 
    customer_id,
    order_date,
    total_amount,     
    RANK() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS spend_rank
    FROM Orders; 
   

--6.3 Window functions - Running total - Cumulative sum of spending over time 
SELECT 
    customer_id,
    order_date,
    total_amount,
    SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date 
                            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_spent
    FROM Orders; 
 
--7. CTE
WITH LowStockRisk AS (
    SELECT 
        product_id,
        product_name,
        stock,
        price,
        (stock * price) AS potential_lost_revenue_risk
    FROM Products
    WHERE stock < 20
)
SELECT 
    product_name,
    stock,
    potential_lost_revenue_risk
FROM LowStockRisk
ORDER BY potential_lost_revenue_risk DESC;
