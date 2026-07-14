const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/inventoryController");

const { protect } = require("../middleware/authMiddleware");

// Add Product
router.post("/", protect, addProduct);

// Get All Products
router.get("/", protect, getProducts);

// Get Single Product
router.get("/:id", protect, getProductById);

// Update Product
router.put("/:id", protect, updateProduct);

// Delete Product
router.delete("/:id", protect, deleteProduct);

module.exports = router;