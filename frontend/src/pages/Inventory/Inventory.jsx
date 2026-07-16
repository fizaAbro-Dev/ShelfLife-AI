import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Upload, X } from "lucide-react";

import emptyInventory from "../../assets/images/inven-emp.png";

function Inventory() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
            Inventory
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Manage Your Products
          </h1>

          <p className="mt-2 text-gray-500">
            Upload a receipt with AI or manually add a product.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate("/scan")}
            className="flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            <Upload size={19} />
            Upload Receipt
          </button>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-xl border border-green-700 px-5 py-3 font-semibold text-green-700 transition hover:bg-green-50"
          >
            <Plus size={19} />
            Add Product
          </button>
        </div>
      </header>

      <section className="mt-8 rounded-[32px] border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
        <div className="flex justify-center">
          <img
            src={emptyInventory}
            alt="Empty inventory illustration"
            className="w-full max-w-[330px] object-contain md:max-w-[390px]"
          />
        </div>

        <h2 className="mt-5 text-3xl font-bold text-gray-900">
          Your Inventory Is Empty
        </h2>

        <p className="mx-auto mt-3 max-w-lg leading-7 text-gray-500">
          Upload a grocery receipt or manually add your first product. Products
          will appear here after they are saved.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/scan")}
            className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            Upload Receipt
          </button>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="rounded-xl border border-green-700 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
          >
            Add Product Manually
          </button>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Add Product
                </h2>

                <p className="mt-2 text-gray-500">
                  Enter the product information below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-xl bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            <form
              className="mt-7 grid gap-5 md:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                alert("Product form is ready for backend integration.");
                setShowModal(false);
              }}
            >
              <div className="md:col-span-2">
                <label
                  htmlFor="productName"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Product Name
                </label>

                <input
                  id="productName"
                  type="text"
                  required
                  placeholder="Enter product name"
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-green-600"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Category
                </label>

                <select
                  id="category"
                  required
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-green-600"
                >
                  <option value="">Select category</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Meat">Meat</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Grains">Grains</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Quantity
                </label>

                <input
                  id="quantity"
                  type="number"
                  required
                  min="1"
                  placeholder="Enter quantity"
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-green-600"
                />
              </div>

              <div>
                <label
                  htmlFor="purchaseDate"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Purchase Date
                </label>

                <input
                  id="purchaseDate"
                  type="date"
                  required
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-green-600"
                />
              </div>

              <div>
                <label
                  htmlFor="expiryDate"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Expiry Date
                </label>

                <input
                  id="expiryDate"
                  type="date"
                  required
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-green-600"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Price
                </label>

                <input
                  id="price"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="Enter price"
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-green-600"
                />
              </div>

              <div>
                <label
                  htmlFor="productImage"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Product Image
                  <span className="ml-1 font-normal text-gray-400">
                    (Optional)
                  </span>
                </label>

                <input
                  id="productImage"
                  type="file"
                  accept="image/*"
                  className="w-full rounded-xl border border-gray-200 p-3"
                />
              </div>

              <div className="flex flex-wrap justify-end gap-3 md:col-span-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Inventory;