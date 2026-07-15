const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/db");
const dns = require("dns");
const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
dns.setServers(["8.8.8.8", "1.1.1.1"]);




// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/recipes", recipeRoutes);

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ShelfLife AI Backend is Running",
  });
});
console.log("Gemini Key:", process.env.GEMINI_API_KEY);
// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port 5000`);
});