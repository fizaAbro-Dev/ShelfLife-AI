// backend/routes/ocrRoutes.js
const express = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");
const { scanReceipt } = require("../controllers/ocrController");

const router = express.Router();
const upload = multer({ storage: storage });

// POST /api/ocr/scan
// Postman se "image" key ke sath ek file bheji jayegi
router.post("/scan", (req, res) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      console.error("UPLOAD ERROR:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
    scanReceipt(req, res);
  });
});

module.exports = router;