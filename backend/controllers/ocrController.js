// backend/controllers/ocrController.js
const axios = require("axios");

// POST /api/ocr/scan
// Yeh function tab chalega jab image already Cloudinary pe upload ho chuki ho
// (multer-storage-cloudinary middleware ne upload kar diya hoga route mein)
const scanReceipt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "no image" });
    }

    const imageUrl = req.file.path; // Cloudinary ne diya hua URL

    // OCR.space ko yeh URL bhejna
    const ocrResponse = await axios.get("https://api.ocr.space/parse/imageurl", {
      params: {
        apikey: process.env.OCR_API_KEY,
        url: imageUrl,
        language: "eng",
        OCREngine: 2,
        isTable: true, // receipts/tables ke liye row structure behtar rakhta hai
      },
      timeout: 30000,
    });

    const parsedText = ocrResponse.data?.ParsedResults?.[0]?.ParsedText || "";

    if (!parsedText) {
      return res.status(422).json({ success: false, message: "Text nahi nikal saka image se" });
    }

    // Raw text ko clean items list mein badalna
    const items = parseReceiptText(parsedText);

    return res.status(200).json({
      success: true,
      imageUrl,      // Cloudinary wala link
      rawText: parsedText, // OCR ka pura raw text
      items,          // Clean items list jo Inventory mein daali ja sakti hai
    });
  } catch (error) {
    console.error("OCR SCAN ERROR:", error.message);
    if (error.response) {
      console.error("OCR.space Response Data:", error.response.data);
    }
    return res.status(500).json({ success: false, message: "OCR processing failed" });
  }
};

// Helper function: messy text ko item list mein todta hai
function parseReceiptText(rawText) {
  const lines = rawText
    .split("\n")
    .map((l) => l.replace(/\r/g, "").replace(/\t+/g, " ").trim()) // \r hatana, tabs ko space banana
    .filter((l) => l !== "");

  const items = [];

  lines.forEach((line) => {
    // Line ke aakhir mein price (jaisay 3.98) dhoondhna
    const match = line.match(/^(.*?)\s*(\d+\.\d{2})$/);
    if (match) {
      const name = match[1].trim();
      const price = parseFloat(match[2]);
      if (name.length > 1 && !isNaN(price)) {
        items.push({ name, price });
      }
    }
  });

  return items;
}

module.exports = { scanReceipt };