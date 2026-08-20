const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// GET all products
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        products.id,
        products.name,
        products.description,
        products.price,
        products.image_url,
        products.availability,
        products.category_id,
        categories.name AS category
      FROM products
      LEFT JOIN categories
        ON products.category_id = categories.id
      ORDER BY products.id
    `);

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
    });
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Get product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve product",
    });
  }
});

// POST create product
router.post("/", async (req, res) => {
  try {
    const {
      category_id,
      name,
      description,
      price,
      image_url,
      availability,
    } = req.body;

    if (!name || price === undefined || price === null) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO products
      (category_id, name, description, price, image_url, availability)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        category_id || null,
        name,
        description || null,
        price,
        image_url || null,
        availability ?? true,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
});

// PUT update product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      category_id,
      name,
      description,
      price,
      image_url,
      availability,
    } = req.body;

    const result = await pool.query(
      `UPDATE products
      SET
        category_id = COALESCE($1, category_id),
        name = COALESCE($2, name),
        description = COALESCE($3, description),
        price = COALESCE($4, price),
        image_url = COALESCE($5, image_url),
        availability = COALESCE($6, availability),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *`,
      [
        category_id,
        name,
        description,
        price,
        image_url,
        availability,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
});

module.exports = router;