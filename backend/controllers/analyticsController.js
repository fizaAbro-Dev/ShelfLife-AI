const Inventory = require("../models/Inventory");

const getAnalytics = async (req, res) => {
  try {
    const products = await Inventory.find({
      user: req.user._id,
    });

    const today = new Date();

    let totalProducts = products.length;
    let fresh = 0;
    let expiringSoon = 0;
    let expired = 0;

    let totalValue = 0;
    let moneyAtRisk = 0;

    products.forEach((item) => {
      totalValue += item.price * item.quantity;

      const expiry = new Date(item.expiryDate);

      const diffDays = Math.ceil(
        (expiry - today) / (1000 * 60 * 60 * 24)
      );

      if (diffDays < 0) {
        expired++;
        moneyAtRisk += item.price * item.quantity;
      } else if (diffDays <= 3) {
        expiringSoon++;
        moneyAtRisk += item.price * item.quantity;
      } else {
        fresh++;
      }
    });

    res.status(200).json({
      success: true,
      analytics: {
        totalProducts,
        fresh,
        expiringSoon,
        expired,
        totalValue,
        moneyAtRisk,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};