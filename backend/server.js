const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const dns = require("dns");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const ocrRoutes = require("./routes/ocrRoutes");


dns.setServers(["8.8.8.8", "1.1.1.1"]);


// Database Connection
connectDB();


const app = express();


// Middlewares
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/inventory", inventoryRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/ocr", ocrRoutes);

app.use("/api/recipes", recipeRoutes);


// Static uploads (temporary)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);



// Test Route
app.get("/", (req,res)=>{
  res.status(200).json({
    success:true,
    message:"ShelfLife AI Backend is Running"
  });
});



// // Local Development Only
// if(process.env.NODE_ENV !== "production"){

//   const PORT = process.env.PORT || 5000;

//   app.listen(PORT,()=>{
//     console.log(
//       `Server running on port ${PORT}`
//     );
//   });

// }


// Vercel serverless export
module.exports = app;