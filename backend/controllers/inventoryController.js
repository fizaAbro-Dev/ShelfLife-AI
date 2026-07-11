const Inventory = require("../models/Inventory");

// ===================================
// Add New Product
// ===================================
const addProduct = async (req, res) => {
  try {
    const {
      productName,
      category,
      quantity,
      purchaseDate,
      expiryDate,
      price,
      image,
    } = req.body;

    const product = await Inventory.create({
      productName,
      category,
      quantity,
      purchaseDate,
      expiryDate,
      price,
      image,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Get All Products
// ===================================
const getProducts = async (req, res) => {
  try {
    const products = await Inventory.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Get Single Product
// ===================================
const getProductById = async (req, res) => {
  try {
    const product = await Inventory.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Update Product
// ===================================
const updateProduct = async (req, res) => {
  try {
    const product = await Inventory.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Delete Product
// ===================================
const deleteProduct = async (req, res) => {
  try {
    const product = await Inventory.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!product) {
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};