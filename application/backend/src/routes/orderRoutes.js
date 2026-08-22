const express = require("express");
const pool = require("../config/database");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

// CREATE ORDER
router.post("/", authenticateToken, async (req, res) => {
  const client = await pool.connect();

  try {
    const { items } = req.body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    await client.query("BEGIN");

    let totalAmount = 0;
    const validatedItems = [];

    // Validate products and calculate total from database prices
    for (const item of items) {
      if (
        !item.product_id ||
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
      totalAmount += price * item.quantity;

      validatedItems.push({
        product_id: product.id,
        quantity: item.quantity,
        price,
      });
    }

    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount, status)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [
        req.user.id,
        totalAmount,
        "PENDING",
      ]
    );

    const order = orderResult.rows[0];

    // Create order items
    for (const item of validatedItems) {
      await client.query(
        `INSERT INTO order_items
         (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [
          order.id,
          item.product_id,
          item.quantity,
          item.price,
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
    await client.query("ROLLBACK");

    console.error("Create order error:", error);

    res.status(400).json({
      success: false,
      message: error.message || "Failed to place order",
    });
  } finally {
    client.release();
  }
});

module.exports = router;