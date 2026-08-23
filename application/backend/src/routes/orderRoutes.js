const express = require("express");
const pool = require("../config/database");
const authenticateToken = require("../middlewares/authMiddleware");
const requireRole = require("../middlewares/roleMiddleware");


const router = express.Router();

// GET logged-in user's orders
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        orders.id,
        orders.user_id,
        orders.total_amount,
        orders.status,
        orders.delivery_address,
        COALESCE(
          json_agg(
            json_build_object(
              'id', order_items.id,
              'product_id', order_items.product_id,
              'product_name', products.name,
              'quantity', order_items.quantity,
              'unit_price', order_items.unit_price,
              'subtotal', order_items.subtotal
            )
            ORDER BY order_items.id
          ) FILTER (WHERE order_items.id IS NOT NULL),
          '[]'
        ) AS items
       FROM orders
       LEFT JOIN order_items
        ON order_items.order_id = orders.id
       LEFT JOIN products
        ON products.id = order_items.product_id
       WHERE orders.user_id = $1
       GROUP BY
        orders.id,
        orders.user_id,
        orders.total_amount,
        orders.status,
        orders.delivery_address
       ORDER BY orders.id DESC`,
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve orders",
    });
  }
});

// CREATE ORDER
router.post("/", authenticateToken, async (req, res) => {
  let client;
  let transactionStarted = false;

  try {
    const { items, delivery_address } = req.body || {};

    if (typeof delivery_address !== "string" || delivery_address.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one order item is required",
      });
    }

    client = await pool.connect();
    await client.query("BEGIN");
    transactionStarted = true;

    let totalAmount = 0;
    const validatedItems = [];

    // Validate products and calculate total from database prices
    for (const item of items) {
      if (
        !item ||
        !Number.isInteger(item.product_id) ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        throw new Error("Invalid order item");
      }

      const productResult = await client.query(
        `SELECT id, name, price, availability
         FROM products
         WHERE id = $1`,
        [item.product_id]
      );

      if (productResult.rows.length === 0) {
        throw new Error(
          `Product with ID ${item.product_id} was not found`
        );
      }

      const product = productResult.rows[0];

      if (!product.availability) {
        throw new Error(
          `Product "${product.name}" is not available`
        );
      }

      const price = Number(product.price);
      const subtotal = price * item.quantity;
      totalAmount += subtotal;

      validatedItems.push({
        product_id: product.id,
        quantity: item.quantity,
        price,
        subtotal,
      });
    }

    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount, status, delivery_address)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        req.user.id,
        totalAmount,
        "PENDING",
        delivery_address.trim(),
      ]
    );

    const order = orderResult.rows[0];

    // Create order items
    for (const item of validatedItems) {
      await client.query(
        `INSERT INTO order_items
         (order_id, product_id, quantity, unit_price, subtotal)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          order.id,
          item.product_id,
          item.quantity,
          item.price,
          item.subtotal,
        ]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: {
        order,
        items: validatedItems,
      },
    });
  } catch (error) {
    if (client && transactionStarted) {
      await client.query("ROLLBACK");
    }

    console.error("Create order error:", error);

    res.status(400).json({
      success: false,
      message: error.message || "Failed to place order",
    });
  } finally {
    client?.release();
  }
});

// GET ALL ORDERS - ADMIN ONLY
router.get(
  "/admin/all",
  authenticateToken,
  requireRole("ADMIN"),
  async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT
          orders.id,
          orders.user_id,
          users.full_name,
          users.email,
          orders.total_amount,
          orders.status,
          orders.delivery_address,
          orders.created_at
        FROM orders
        JOIN users ON orders.user_id = users.id
        ORDER BY orders.created_at DESC
      `);

      res.status(200).json({
        success: true,
        data: result.rows,
      });
    } catch (error) {
      console.error("Get all orders error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to retrieve orders",
      });
    }
  }

);
// UPDATE ORDER STATUS - ADMIN ONLY
router.put(
  "/admin/:id/status",
  authenticateToken,
  requireRole("ADMIN"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body || {};

      const allowedStatuses = [
        "PENDING",
        "CONFIRMED",
        "PREPARING",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED"
      ];

      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Order status is required",
        });
      }

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order status",
        });
      }

      const result = await pool.query(
        `UPDATE orders
         SET status = $1
         WHERE id = $2
         RETURNING *`,
        [status, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Update order status error:", error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// CANCEL ORDER - ADMIN ONLY
router.put(
  "/admin/:id/cancel",
  authenticateToken,
  requireRole("ADMIN"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `UPDATE orders
         SET status = 'CANCELLED'
         WHERE id = $1
         RETURNING *`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Order cancelled successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Cancel order error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to cancel order",
      });
    }
  }
);

// GET SINGLE ORDER - ADMIN ONLY
router.get(
  "/admin/:id",
  authenticateToken,
  requireRole("ADMIN"),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Get order details
      const orderResult = await pool.query(
        `SELECT * FROM orders WHERE id = $1`,
        [id]
      );

      if (orderResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Get order items
      const itemsResult = await pool.query(
        `SELECT * FROM order_items WHERE order_id = $1`,
        [id]
      );

      res.status(200).json({
        success: true,
        message: "Order retrieved successfully",
        data: {
          ...orderResult.rows[0],
          items: itemsResult.rows,
        },
      });

    } catch (error) {
      console.error("Get single order error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to retrieve order",
      });
    }
  }
);
module.exports = router;
