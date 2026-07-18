const Inventory = require("../models/Inventory");
const Notification = require("../models/Notification");
const { checkExpiringProducts } = require("../services/notificationService");

// // ===================================
// // Get All Products
// // ===================================
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



const addProduct = async (req, res) => {
  try {
    const {
      productName,
      category,
      quantity,
      purchaseDate,
      expiryDate,
      price,
    } = req.body;

    const image = req.file
      ? `/uploads/products/${req.file.filename}`
      : "";


      const existingProduct = await Inventory.findOne({
  user: req.user._id,
  productName: productName.trim(),
});

if (existingProduct) {
  return res.status(400).json({
    success: false,
    message: "This product already exists in your inventory.",
  });
}
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
await Notification.create({
  user: req.user._id,
  inventory: product._id,
  title: "Product Added",
  message: `${product.productName} was added successfully. Quantity: ${product.quantity}.`,
  type: "system",
});

    // Notification check yahin trigger karo — frontend par depend mat karo
    try {
      console.log("🔥 Triggering notification check after product add");
      await checkExpiringProducts();
      console.log("🔥 Notification check completed");
    } catch (notifErr) {
      console.log("Notification check failed:", notifErr.message);
    }

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

    const data = {
      ...req.body,
    };

    // Agar nayi image upload hui hai to image bhi update karo
    if (req.file) {
      data.image = `/uploads/products/${req.file.filename}`;
    }

    const product = await Inventory.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      data,
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


 await Notification.create({
  user: req.user._id,
  inventory: product._id,
  title: "Product Updated",
  message: `${product.productName} information was updated.`,
  type: "system",
});
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

await Notification.create({
  user: req.user._id,
  title: "Product Deleted",
  message: `${product.productName} was removed from your inventory.`,
  type: "system",
});

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