const Inventory = require("../models/Inventory");
const Notification = require("../models/Notification");

const checkExpiringProducts = async () => {
  try {
    const today = new Date();

    const products = await Inventory.find();

    for (const product of products) {
      const expiryDate = new Date(product.expiryDate);

      const diffDays = Math.ceil(
        (expiryDate - today) / (1000 * 60 * 60 * 24)
      );

      let title = "";
      let message = "";

      if (diffDays < 0) {
        title = "Product Expired";

        message = `${product.productName} has expired.`;
      } else if (diffDays <= 3) {
        title = "Product Expiring Soon";

        message = `${product.productName} will expire in ${diffDays} day(s).`;
      } else {
        continue;
      }

      // Prevent duplicate notifications
      const exists = await Notification.findOne({
        user: product.user,
        inventory: product._id,
        title,
      });

      if (!exists) {
        await Notification.create({
          user: product.user,
          inventory: product._id,
          title,
          message,
          type: "expiry",
        });
      }
    }

    console.log("Notification service executed successfully.");

  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  checkExpiringProducts,
};