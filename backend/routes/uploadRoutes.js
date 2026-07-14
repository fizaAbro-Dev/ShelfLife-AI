// backend/routes/uploadRoutes.js
const express = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");

const router = express.Router();
const upload = multer({ storage: storage });

// POST /api/upload/test
// Postman se ek image bheji jayegi (form-data mein "image" key ke sath)
// Yeh route usay Cloudinary pe upload karega aur URL wapas dega
router.post("/test", (req, res) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      console.error("UPLOAD ERROR:", err);
      return res.status(500).json({ success: false, message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Koi image nahi mili" });
    }

    res.status(200).json({
      success: true,
      message: "Image Cloudinary pe upload ho gayi!",
      imageUrl: req.file.path,
    });
  });
});

module.exports = router;