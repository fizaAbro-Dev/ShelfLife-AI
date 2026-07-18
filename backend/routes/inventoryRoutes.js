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
const upload = require("../middleware/upload");

// Add Product
router.post(
  "/",
  protect,
  upload.single("image"),
  addProduct
);

// Get All Products
router.get("/", protect, getProducts);

// Get Single Product
router.get("/:id", protect, getProductById);

// Update Product
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateProduct
);

// Delete Product
router.delete("/:id", protect, deleteProduct);

module.exports = router;