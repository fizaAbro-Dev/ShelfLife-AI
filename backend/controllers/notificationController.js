const Notification = require("../models/Notification");
const { checkExpiringProducts } = require("../services/notificationService");
// ==========================
// Get All Notifications
// ==========================

const checkNotifications = async (req, res) => {
  try {

    console.log("🔥 CHECK ROUTE HIT");

    await checkExpiringProducts();

    console.log("🔥 CHECK SERVICE COMPLETED");

    res.status(200).json({
      success: true,
      message: "Notifications checked successfully."
    });

  } catch (error) {

    console.log("Notification Error:", error);

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    })
      .populate("inventory", "productName expiryDate")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Mark Notification as Read
// ==========================
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Delete Notification
// ==========================
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user: req.user._id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getNotifications,
  markAsRead,
  deleteNotification,
    checkNotifications,
  markAllAsRead,
};