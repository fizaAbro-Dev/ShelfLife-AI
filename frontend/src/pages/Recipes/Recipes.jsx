import { useNavigate } from "react-router-dom";
import { ChefHat, PackageOpen, ScanLine, Sparkles } from "lucide-react";

function Recipes() {
  const navigate = useNavigate();

  const recipes = [];
  const hasInventory = false;

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
            Recipe suggestions will be generated from the products available in
            your inventory.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-green-50 px-5 py-4 text-green-700">
          <Sparkles size={23} />

          <div>
            <p className="text-sm font-bold">AI Powered</p>
            <p className="text-xs text-green-600">
              Suggestions based on your inventory
            </p>
          </div>
        </div>
      </header>

      {!hasInventory ? (
        <section className="mt-8 rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-700">
            <PackageOpen size={46} />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            No Recipe Suggestions Yet
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-500">
            Add products manually or scan a grocery receipt first. ShelfLife AI
            will then suggest recipes using your available ingredients.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/inventory")}
              className="rounded-xl border border-green-700 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
            >
              Add Products
            </button>

            <button
              type="button"
              onClick={() => navigate("/scan")}
              className="flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              <ScanLine size={19} />
              Scan Receipt
            </button>
          </div>
        </section>
      ) : recipes.length === 0 ? (
        <section className="mt-8 rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-700">
            <ChefHat size={46} />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Generating Recipe Suggestions
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Your inventory is available. AI-generated recipes will appear here
            after backend integration.
          </p>
        </section>
      ) : (
        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => (
            <article
              key={recipe.id}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900">
                {recipe.title}
              </h2>

              <p className="mt-3 text-gray-500">
                {recipe.description}
              </p>

              {recipe.reason && (
                <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
                  <span className="font-bold">AI note:</span> {recipe.reason}
                </div>
              )}
            </article>
          ))}
        </section>
      )}
    </>
  );
}

export default Recipes;