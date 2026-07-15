const Inventory = require("../models/Inventory");

const { generateRecipes } = require("../services/geminiService");

const { getRecipeImage } = require("../services/recipeImageService");

// GET /api/recipes
const getRecipes = async (req, res) => {
  try {
    const inventory = await Inventory.find({ user: req.user.id });
    console.log("✅ Inventory fetched:", inventory.length);

    if (inventory.length === 0) {
      return res.status(404).json({ success: false, message: "No inventory items found." });
    }

    const products = inventory.map((item) => item.productName);
    console.log("✅ Products:", products);

    console.log("⏳ Calling Gemini...");
    const recipes = await generateRecipes(products);
    console.log("✅ Gemini responded:", recipes.length, "recipes");

    console.log("⏳ Fetching images...");
    const recipesWithImages = await Promise.all(
      recipes.map(async (recipe) => {
        const imageUrl = await getRecipeImage(recipe.title);
        return { ...recipe, imageUrl };
      })
    );
    console.log("✅ Images fetched");

    res.status(200).json({ success: true, totalRecipes: recipesWithImages.length, recipes: recipesWithImages });

  } catch (error) {
    console.error("Recipe Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  getRecipes,
};