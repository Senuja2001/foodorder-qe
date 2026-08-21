const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

const router = express.Router();

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    // Validation
    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check existing user
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, full_name, email, role, created_at`,
      [full_name, email, passwordHash]
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

module.exports = router;