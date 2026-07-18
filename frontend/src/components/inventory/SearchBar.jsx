import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
      <Search className="text-gray-400" size={20} />

      <input
        type="text"
        placeholder="Search products..."
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
}

export default SearchBar;