const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// GET all categories
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categories ORDER BY id"
    );

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get categories error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve categories",
    });
  }
});

module.exports = router;