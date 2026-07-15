const { GoogleGenAI } = require("@google/genai");

let ai;
const getClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }
  return ai;
};

const MODELS = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-2.5-flash-lite"];

const generateRecipes = async (products, modelIndex = 0, retries = 2) => {
  const currentModel = MODELS[modelIndex];

  try {
    const prompt = `You are an expert chef and nutrition assistant.

Available ingredients:
${products.join(", ")}

Generate EXACTLY 3 recipes using ONLY these ingredients.
You may use common pantry items like salt, pepper, oil, butter and spices.

VERY IMPORTANT RULES:

1. Suggest ONLY real, well-known recipes that already exist.
2. Recipe title MUST be a common recipe name that people can search on Google or TheMealDB.
3. Keep the recipe title SHORT (maximum 2-3 words).
4. Do NOT add words like:
   - with
   - topped with
   - creamy
   - healthy
   - deluxe
   - style
   - special
   - homemade
   - bowl
   - slices
   - fresh
5. Do NOT invent recipe names.
6. Do NOT rename recipes.
7. Recipe titles should be similar to these examples:

French Toast
Omelette
Scrambled Eggs
Pancakes
Fried Rice
Egg Fried Rice
Rice Pudding
Apple Pie
Fruit Salad
Vegetable Soup
Grilled Cheese
Milkshake
Smoothie

The recipe title should be searchable on TheMealDB database.

Return ONLY valid JSON.

[
  {
    "title": "",
    "description": "",
    "ingredients": [],
    "instructions": []
  }
]
`;

    console.log(`⏳ Trying model: ${currentModel}`);

    const response = await getClient().models.generateContent({
      model: currentModel,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const recipes = JSON.parse(response.text);
    return recipes;

  } catch (error) {
    const isOverloaded = error.message?.includes("UNAVAILABLE") || error.status === 503;
    const isNotFound = error.status === 404;
    const isQuotaExceeded =
  error.status === 429 ||
  error.message?.includes("RESOURCE_EXHAUSTED") ||
  error.message?.includes("Quota exceeded");

    if (isOverloaded && retries > 0) {
      console.log(`⚠️ ${currentModel} overloaded, retrying... (${retries} left)`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return generateRecipes(products, modelIndex, retries - 1);
    }

  if (
  (isOverloaded || isNotFound || isQuotaExceeded) &&
  modelIndex < MODELS.length - 1
) {
  console.log(
    `⚠️ ${currentModel} unavailable/quota exceeded (${error.status}), switching to ${MODELS[modelIndex + 1]}`
  );

  return generateRecipes(products, modelIndex + 1, 2);
}
    console.error("Gemini Error:", error);
    throw error;
  }
};

module.exports = {
  generateRecipes,
};