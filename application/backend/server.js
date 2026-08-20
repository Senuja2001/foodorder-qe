const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FoodOrder API is running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "FoodOrder Backend",
    status: "healthy"
  });
});

app.listen(PORT, () => {
  console.log(`FoodOrder API running on http://localhost:${PORT}`);
});