const axios = require("axios");

const getRecipeImage = async (recipeName) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(recipeName)}`
    );

    if (
      response.data.meals &&
      response.data.meals.length > 0
    ) {
      return response.data.meals[0].strMealThumb;
    }

    // Fallback image
    return "https://placehold.co/600x400?text=Recipe";

  } catch (error) {
    console.log("MealDB Error:", error.message);

 return "https://placehold.co/600x400?text=Recipe";
  }
};

module.exports = {
  getRecipeImage,
};