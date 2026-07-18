import { useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  ScanLine,
  ChefHat,
  Bell,
  BarChart3,
  User,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Package, label: "Inventory", path: "/inventory" },
  { icon: ScanLine, label: "Scan Receipt", path: "/scan" },
  { icon: ChefHat, label: "AI Recipes", path: "/recipes" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: User, label: "Profile", path: "/profile" },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
function handleLogout() {
  localStorage.removeItem("shelflife_token");

  navigate("/login");
}

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col bg-[#0B5D37] px-5 py-7 text-white lg:flex">
      <div className="mb-10 flex items-center gap-3 px-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-2xl">
          🌿
        </div>

        <div>
          <h1 className="text-xl font-bold">ShelfLife AI</h1>
          <p className="text-xs text-green-100">Smart food management</p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left font-medium transition ${
                isActive
                  ? "bg-white text-[#0B5D37]"
                  : "text-green-50 hover:bg-white/10"
              }`}
            >
              <Icon size={21} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-auto flex items-center gap-4 rounded-2xl px-4 py-3 text-green-100 transition hover:bg-white/10"
      >
        <LogOut size={21} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;