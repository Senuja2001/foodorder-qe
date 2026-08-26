-- FoodOrder PostgreSQL Data Validation Queries
-- Purpose: Quality Engineering database consistency checks.
-- Safety: SELECT queries only. These queries do not modify or delete data.

-- 1. User data integrity: missing required user values, invalid email format, or unexpected role.
SELECT
    id,
    full_name,
    email,
    role,
    created_at
FROM users
WHERE full_name IS NULL
   OR btrim(full_name) = ''
   OR email IS NULL
   OR btrim(email) = ''
   OR email !~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
   OR password_hash IS NULL
   OR btrim(password_hash) = ''
   OR role IS NULL
   OR role NOT IN ('CUSTOMER', 'ADMIN');

-- 2. User data integrity: duplicate email addresses.
SELECT
    lower(email) AS normalized_email,
    COUNT(*) AS duplicate_count
FROM users
WHERE email IS NOT NULL
GROUP BY lower(email)
HAVING COUNT(*) > 1;

-- 3. Product data integrity: missing product details, invalid price, or missing availability.
SELECT
    id,
    category_id,
    name,
    description,
    price,
    availability
FROM products
WHERE name IS NULL
   OR btrim(name) = ''
   OR price IS NULL
   OR price <= 0
   OR availability IS NULL;

-- 4. Product data integrity: product categories that do not exist.
SELECT
    p.id AS product_id,
    p.name AS product_name,
    p.category_id
FROM products p
LEFT JOIN categories c
    ON c.id = p.category_id
WHERE p.category_id IS NOT NULL
  AND c.id IS NULL;

-- 5. Order persistence: invalid or incomplete order records.
SELECT
    id,
    user_id,
    total_amount,
    status,
    delivery_address,
    created_at
FROM orders
WHERE user_id IS NULL
   OR total_amount IS NULL
   OR total_amount < 0
   OR status IS NULL
   OR status NOT IN (
        'PENDING',
        'CONFIRMED',
        'PREPARING',
        'OUT_FOR_DELIVERY',
        'DELIVERED',
        'CANCELLED'
   )
   OR delivery_address IS NULL
   OR btrim(delivery_address) = '';

-- 6. Order item persistence: missing required order item values.
SELECT
    id,
    order_id,
    product_id,
    quantity,
    unit_price AS price,
    subtotal
FROM order_items
WHERE order_id IS NULL
   OR product_id IS NULL
   OR quantity IS NULL
   OR unit_price IS NULL
   OR subtotal IS NULL;

-- 7. Foreign key relationship: orders linked to missing users.
SELECT
    o.id AS order_id,
    o.user_id
FROM orders o
LEFT JOIN users u
    ON u.id = o.user_id
WHERE u.id IS NULL;

-- 8. Foreign key relationship: orphaned order_items linked to missing orders.
SELECT
    oi.id AS order_item_id,
    oi.order_id,
    oi.product_id
FROM order_items oi
LEFT JOIN orders o
    ON o.id = oi.order_id
WHERE o.id IS NULL;

-- 9. Foreign key relationship: order_items linked to missing products.
SELECT
    oi.id AS order_item_id,
    oi.order_id,
    oi.product_id
FROM order_items oi
LEFT JOIN products p
    ON p.id = oi.product_id
WHERE p.id IS NULL;

-- 10. Missing required values across core FoodOrder tables.
SELECT 'users' AS table_name, id::text AS record_id, 'Missing full_name' AS issue
FROM users
WHERE full_name IS NULL OR btrim(full_name) = ''
UNION ALL
SELECT 'users', id::text, 'Missing email'
FROM users
WHERE email IS NULL OR btrim(email) = ''
UNION ALL
SELECT 'products', id::text, 'Missing product name'
FROM products
WHERE name IS NULL OR btrim(name) = ''
UNION ALL
SELECT 'products', id::text, 'Missing product price'
FROM products
WHERE price IS NULL
UNION ALL
SELECT 'orders', id::text, 'Missing user_id'
FROM orders
WHERE user_id IS NULL
UNION ALL
SELECT 'orders', id::text, 'Missing total_amount'
FROM orders
WHERE total_amount IS NULL
UNION ALL
SELECT 'order_items', id::text, 'Missing quantity'
FROM order_items
WHERE quantity IS NULL
UNION ALL
SELECT 'order_items', id::text, 'Missing unit_price'
FROM order_items
WHERE unit_price IS NULL
UNION ALL
SELECT 'order_items', id::text, 'Missing subtotal'
FROM order_items
WHERE subtotal IS NULL;

-- 11. Invalid quantities: order item quantity must be greater than zero.
SELECT
    id,
    order_id,
    product_id,
    quantity
FROM order_items
WHERE quantity IS NULL
   OR quantity <= 0;

-- 12. Data consistency problem: order_items where price is NULL or 0.
SELECT
    id,
    order_id,
    product_id,
    quantity,
    unit_price AS price,
    subtotal
FROM order_items
WHERE unit_price IS NULL
   OR unit_price <= 0;

-- 13. Order item subtotal consistency: subtotal should equal unit_price multiplied by quantity.
SELECT
    id,
    order_id,
    product_id,
    quantity,
    unit_price AS price,
    subtotal,
    (unit_price * quantity) AS expected_subtotal,
    (subtotal - (unit_price * quantity)) AS difference
FROM order_items
WHERE unit_price IS NULL
   OR quantity IS NULL
   OR subtotal IS NULL
   OR ABS(subtotal - (unit_price * quantity)) > 0.01;

-- 14. Order total consistency: order total_amount should equal sum of order item subtotals.
SELECT
    o.id AS order_id,
    o.total_amount AS recorded_total,
    COALESCE(SUM(oi.subtotal), 0) AS calculated_total,
    (o.total_amount - COALESCE(SUM(oi.subtotal), 0)) AS difference
FROM orders o
LEFT JOIN order_items oi
    ON oi.order_id = o.id
GROUP BY
    o.id,
    o.total_amount
HAVING o.total_amount IS NULL
    OR ABS(o.total_amount - COALESCE(SUM(oi.subtotal), 0)) > 0.01;

-- 15. Orders without order_items.
SELECT
    o.id AS order_id,
    o.user_id,
    o.total_amount,
    o.status,
    o.created_at
FROM orders o
LEFT JOIN order_items oi
    ON oi.order_id = o.id
WHERE oi.id IS NULL;

-- 16. Order persistence detail: order with saved order item count and calculated total.
SELECT
    o.id AS order_id,
    o.user_id,
    o.status,
    o.total_amount AS recorded_total,
    COUNT(oi.id) AS item_count,
    COALESCE(SUM(oi.subtotal), 0) AS calculated_total
FROM orders o
LEFT JOIN order_items oi
    ON oi.order_id = o.id
GROUP BY
    o.id,
    o.user_id,
    o.status,
    o.total_amount
ORDER BY o.id DESC;
