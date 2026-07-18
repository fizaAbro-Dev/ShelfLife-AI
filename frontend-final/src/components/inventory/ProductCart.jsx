import { Package, ScanLine } from "lucide-react";

function ProductCard() {
  return (
    <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <Package className="text-green-700" size={36} />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-gray-900">
        No Products Yet
      </h2>

      <p className="mx-auto mt-3 max-w-md text-gray-500 leading-7">
        Your inventory is empty. Scan your first grocery receipt or
        manually add a product to start tracking expiry dates.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">

        <button className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800">
          + Add Product
        </button>

        <button className="flex items-center gap-2 rounded-xl border border-green-700 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50">
          <ScanLine size={18} />
          Scan Receipt
        </button>

      </div>

    </div>
  );
}

export default ProductCard;