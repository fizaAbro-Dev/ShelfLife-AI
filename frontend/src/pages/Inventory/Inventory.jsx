import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../services/inventoryService";
import { useNavigate } from "react-router-dom";
import { Plus, Upload, X } from "lucide-react";
import emptyInventory from "../../assets/images/inven-emp.png";
import ProductTable from "../../components/inventory/ProductTable";

function Inventory() {
  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
  productName: "",
  category: "",
  quantity: 1,
  purchaseDate: "",
  expiryDate: "",
  price: "",
  image: "",
});
useEffect(() => {
  loadProducts();
}, []);
const loadProducts = async () => {
  try {
    const res = await getProducts();

  console.log("Inventory API:", JSON.stringify(res, null, 2));

    setProducts(res.products || []);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("productName", formData.productName);
    data.append("category", formData.category);
    data.append("quantity", formData.quantity);
    data.append("purchaseDate", formData.purchaseDate);
    data.append("expiryDate", formData.expiryDate);
    data.append("price", formData.price);

    if (formData.image) {
      data.append("image", formData.image);
    }

    if (editingProduct) {
      await updateProduct(editingProduct._id, data);
      alert("Product updated successfully");
    } else {
      await addProduct(data);

  window.dispatchEvent(new Event("notification-updated"));
      alert("Product added successfully");
    }

    setShowModal(false);
    setEditingProduct(null);

    setFormData({
      productName: "",
      category: "",
      quantity: 1,
      purchaseDate: "",
      expiryDate: "",
      price: "",
      image: "",
    });

    loadProducts();
  } catch (err) {
  console.log("Status:", err.response?.status);
  console.log("Data:", err.response?.data);

  alert(
    err.response?.data?.message || "Something went wrong"
  );
}
};
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    await deleteProduct(id);

    alert("Product deleted successfully");

    loadProducts();
  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Failed to delete product");
  }
};
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
  onClick={() => {
    setEditingProduct(null);

    setFormData({
      productName: "",
      category: "",
      quantity: 1,
      purchaseDate: "",
      expiryDate: "",
      price: "",
      image: "",
    });

    setShowModal(true);
  }}
  className="flex items-center gap-2 rounded-xl border border-green-700 px-5 py-3 font-semibold text-green-700 hover:bg-green-50"
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

{loading ? (
  <h2 className="mt-5 text-3xl font-bold text-gray-900">
    Loading...
  </h2>
) : products.length === 0 ? (
  <>
    <h2 className="mt-5 text-3xl font-bold text-gray-900">
      Your Inventory Is Empty
    </h2>

    <p className="mx-auto mt-3 max-w-lg leading-7 text-gray-500">
      Upload a grocery receipt or manually add your first product. Products
      will appear here after they are saved.
    </p>
  </>
) : (
 <>
  <h2 className="mt-5 text-3xl font-bold text-gray-900">
    {products.length} Products Found
  </h2>

  <div className="mt-8">
    <ProductTable
  products={products}
  onEdit={(product) => {
    setEditingProduct(product);

    setFormData({
      productName: product.productName,
      category: product.category,
      quantity: product.quantity,
      purchaseDate: product.purchaseDate.split("T")[0],
      expiryDate: product.expiryDate.split("T")[0],
      price: product.price,
      image: product.image || "",
    });

    setShowModal(true);
  }}
  onDelete={handleDelete}
/>

  </div>
</>
)}
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
  {editingProduct ? "Edit Product" : "Add Product"}
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
             onSubmit={handleSubmit}
            >
              <div className="md:col-span-2">
                <label
                  htmlFor="productName"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Product Name
                </label>

               <input
  name="productName"
  value={formData.productName}
  onChange={handleChange}
  id="productName"
  type="text"
  required
className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
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
  name="category"
  value={formData.category}
  onChange={handleChange}
  required
  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
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
  name="quantity"
  value={formData.quantity}
  onChange={handleChange}
  type="number"
  min="1"
  required
  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
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
  name="purchaseDate"
  value={formData.purchaseDate}
  onChange={handleChange}
  type="date"
  required
  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
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
  name="expiryDate"
  value={formData.expiryDate}
  onChange={handleChange}
  type="date"
  required
  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
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
  name="price"
  value={formData.price}
  onChange={handleChange}
  type="number"
  required
  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
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
  name="image"
  type="file"
  accept="image/*"
  onChange={(e) =>
    setFormData({
      ...formData,
      image: e.target.files[0],
    })
  }
  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
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
                 {editingProduct ? "Update Product" : "Save Product"}
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