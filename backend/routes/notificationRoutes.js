const express = require("express");
const router = express.Router();

const {
  getNotifications,
  markAsRead,
  deleteNotification,
  checkNotifications,
} = require("../controllers/notificationController");

const { protect } = require("../middleware/authMiddleware");

// Get All Notifications
router.get("/", protect, getNotifications);

// Mark Notification as Read
router.put("/:id/read", protect, markAsRead);

// Delete Notification
router.delete("/:id", protect, deleteNotification);

// Generate Notifications
router.post("/check", protect, checkNotifications);

module.exports = router;