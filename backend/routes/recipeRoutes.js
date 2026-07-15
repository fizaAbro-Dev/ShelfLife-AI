const express = require("express");
const router = express.Router();

const { getRecipes } = require("../controllers/recipeController");
const { protect } = require("../middleware/authMiddleware");

// GET AI Recipes
router.get("/", protect, getRecipes);

module.exports = router;