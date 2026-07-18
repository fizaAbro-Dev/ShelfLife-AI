import { Pencil, Trash2 } from "lucide-react";
function ProductTable({ products, onEdit, onDelete }) {
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
              key={product._id}
              className="border-b last:border-none hover:bg-gray-50"
            >
             <td className="px-6 py-5">
  <div className="flex items-center gap-3">
    {product.image && (
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.productName}
        className="h-12 w-12 rounded-lg object-cover"
      />
    )}

    <span className="font-semibold">
      {product.productName}
    </span>
  </div>
</td>

              <td className="px-6 py-5">
                {product.category}
              </td>

              <td className="px-6 py-5">
                {product.quantity}
              </td>

              <td className="px-6 py-5">
                {new Date(product.expiryDate).toLocaleDateString()}
              </td>

              <td className="px-6 py-5">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {product.status}
                </span>
              </td>

              <td className="px-6 py-5">
                <div className="flex justify-center gap-3">
                  <button
  onClick={() => onEdit(product)}
  className="rounded-lg p-2 hover:bg-gray-100"
>
  <Pencil size={18} />
</button>

                  <button
  onClick={() => onDelete(product._id)}
  className="rounded-lg p-2 hover:bg-red-100"
>
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