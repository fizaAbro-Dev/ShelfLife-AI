import { Pencil, Trash2 } from "lucide-react";

function ProductTable({ products }) {
  return (
    <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Product
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Category
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Quantity
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Expiry
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b last:border-none hover:bg-gray-50"
            >
              <td className="px-6 py-5 font-semibold">
                {product.name}
              </td>

              <td className="px-6 py-5">
                {product.category}
              </td>

              <td className="px-6 py-5">
                {product.quantity}
              </td>

              <td className="px-6 py-5">
                {product.expiry}
              </td>

              <td className="px-6 py-5">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {product.status}
                </span>
              </td>

              <td className="px-6 py-5">
                <div className="flex justify-center gap-3">
                  <button className="rounded-lg p-2 hover:bg-gray-100">
                    <Pencil size={18} />
                  </button>

                  <button className="rounded-lg p-2 hover:bg-red-100">
                    <Trash2
                      size={18}
                      className="text-red-600"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;