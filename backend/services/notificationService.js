const Inventory = require("../models/Inventory");
const Notification = require("../models/Notification");
const checkExpiringProducts = async () => {
  try {

    const today = new Date();
    today.setHours(0,0,0,0);

    const products = await Inventory.find();


console.log("Products Found:", products.length);
    for (const product of products) {

  const expiryDate = new Date(product.expiryDate);
  expiryDate.setHours(0,0,0,0);

  const diffDays = Math.ceil(
    (expiryDate - today) / (1000 * 60 * 60 * 24)
  );

  console.log(
    product.productName,
    "Expiry:",
    expiryDate,
    "Days:",
    diffDays
  );

      
      let title = "";
      let message = "";

      if (diffDays <= 0) {

        title = "Product Expired";
        message = `${product.productName} has expired.`;

      } else if (diffDays <= 3) {

        title = "Product Expiring Soon";
        message = `${product.productName} will expire in ${diffDays} day(s).`;

      } else {
        continue;
      }


      const exists = await Notification.findOne({
        user: product.user,
        inventory: product._id,
        title,
      });

console.log("Creating notification for:", product.productName);
      if(!exists){

        await Notification.create({
          user: product.user,
          inventory: product._id,
          title,
          message,
          type:"expiry",
        });

        console.log("Notification Created:", product.productName);

      }

    }

  } catch(error){

    console.log(error.message);

  }
};

module.exports = {
  checkExpiringProducts,
};