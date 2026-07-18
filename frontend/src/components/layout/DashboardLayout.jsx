import { Outlet } from "react-router-dom";

import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#F6F9F7]">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Topbar />

        <main className="p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;