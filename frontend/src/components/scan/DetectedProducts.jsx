import { ScanLine } from "lucide-react";

function DetectedProducts({ items, setSelectedProduct }) {
  return (
    <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm md:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
        OCR Results
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900">
        Detected Products
      </h2>

      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl border-2 border-dashed border-gray-200 px-6 py-12 text-center">
          <ScanLine size={48} className="mx-auto text-green-600" />

          <h3 className="mt-5 text-xl font-bold">
            No products detected yet
          </h3>

          <p className="mt-3 text-gray-500">
            Upload a receipt and start scanning.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedProduct(item)}
              className="cursor-pointer rounded-2xl border p-5 transition hover:border-green-600 hover:bg-green-50"
            >
              <h3 className="text-lg font-bold text-gray-900">
                {item.name}
              </h3>

              <p className="mt-2 text-gray-600">
                Price: Rs. {item.price}
              </p>

              <button
onClick={() => setSelectedProduct(item)}
className="mt-4 rounded-xl bg-[#0B6B3A] px-4 py-2 text-sm font-semibold text-white"
>
Add Details
</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default DetectedProducts;