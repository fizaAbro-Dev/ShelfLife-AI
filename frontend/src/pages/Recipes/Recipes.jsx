import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChefHat,
  PackageOpen,
  ScanLine,
  Sparkles,
} from "lucide-react";

import API from "../../services/api";

function Recipes() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasInventory, setHasInventory] = useState(true);

  const fetchRecipes = async () => {
    try {
      setLoading(true);

      const res = await API.get("/recipes");

      setRecipes(res.data.recipes || []);
      setHasInventory(true);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 404) {
        setHasInventory(false);
      }

      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
            AI Kitchen Assistant
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Smart Recipe Suggestions
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Generate delicious recipes instantly using the ingredients already
            available in your inventory.
          </p>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="flex items-center gap-3 rounded-2xl bg-green-50 px-5 py-4 text-green-700">
            <Sparkles size={24} />

            <div>
              <p className="text-sm font-bold">
                AI Powered
              </p>

              <p className="text-xs text-green-600">
                Suggestions based on your inventory
              </p>
            </div>
          </div>

          <button
            onClick={fetchRecipes}
            disabled={loading}
            className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Generating Recipes..."
              : recipes.length > 0
              ? "Refresh Recipes"
              : "Generate AI Recipes"}
          </button>
        </div>
      </header>

      {loading && (
        <section className="mt-8 rounded-3xl bg-white py-16 text-center shadow-sm">
          <ChefHat
            className="mx-auto animate-bounce text-green-700"
            size={60}
          />

          <h2 className="mt-5 text-3xl font-bold">
            Generating AI Recipes...
          </h2>

          <p className="mt-3 text-gray-500">
            Please wait while ShelfLife AI creates personalized recipe
            suggestions.
          </p>
        </section>
      )}

      {!loading && !hasInventory ? (
        <section className="mt-8 rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-700">
            <PackageOpen size={46} />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            No Inventory Found
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-500">
            Add products manually or scan a grocery receipt first. Once your
            inventory contains ingredients, ShelfLife AI will generate recipes
            for you.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/inventory")}
              className="rounded-xl border border-green-700 px-6 py-3 font-semibold text-green-700 hover:bg-green-50"
            >
              Add Products
            </button>

            <button
              onClick={() => navigate("/scan")}
              className="flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
            >
              <ScanLine size={18} />
              Scan Receipt
            </button>
          </div>
        </section>
      ) : !loading && recipes.length === 0 ? (
                <section className="mt-8 rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
          <ChefHat className="mx-auto text-green-700" size={60} />

          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            AI Recipe Generator
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-500">
            Click the <span className="font-semibold">Generate AI Recipes</span>{" "}
            button above to generate recipe suggestions based on the ingredients
            available in your inventory.
          </p>
        </section>
      ) : (
        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-lg"
            >
             <img
  src={recipe.imageUrl}
  alt={recipe.title}
  className="h-56 w-full object-cover"
  onError={(e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80";
  }}
/>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {recipe.title}
                </h2>

                <p className="mt-3 text-gray-600">
                  {recipe.description}
                </p>

                <div className="mt-5">
                  <h3 className="font-bold text-green-700">
                    Ingredients
                  </h3>

                  <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600">
                    {recipe.ingredients?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <h3 className="font-bold text-green-700">
                    Instructions
                  </h3>

                  <ol className="mt-2 list-decimal space-y-2 pl-5 text-gray-600">
                    {recipe.instructions?.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  );
}

export default Recipes;