import { Bell, Search } from "lucide-react";

function Topbar() {
  const savedUser = JSON.parse(
    localStorage.getItem("shelflife_user") || "null"
  );

  const userName = savedUser?.name || "User";
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-white px-6 py-5 md:px-8">
      <div>
        <p className="text-sm text-gray-500">Welcome back</p>

        <h2 className="text-2xl font-bold text-gray-900">
          Hello, {userName} 👋
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-3 rounded-2xl bg-gray-100 px-4 py-3 md:flex">
          <Search size={19} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search inventory..."
            className="w-52 bg-transparent text-sm outline-none"
          />
        </div>

        <button
          type="button"
          className="relative rounded-2xl border border-gray-200 p-3 text-gray-600"
        >
          <Bell size={21} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
            {firstLetter}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">ShelfLife User</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;