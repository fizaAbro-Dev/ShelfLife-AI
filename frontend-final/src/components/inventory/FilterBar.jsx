function FilterBar() {
  return (
    <div className="flex flex-wrap gap-4">
      <select className="rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none shadow-sm">
        <option>All Categories</option>
        <option>Dairy</option>
        <option>Vegetables</option>
        <option>Fruits</option>
        <option>Bakery</option>
        <option>Frozen</option>
      </select>

      <select className="rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none shadow-sm">
        <option>All Status</option>
        <option>Fresh</option>
        <option>Expiring Soon</option>
        <option>Expired</option>
      </select>
    </div>
  );
}

export default FilterBar;