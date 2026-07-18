import { useEffect, useState } from "react";
import { getProducts } from "../../services/inventoryService";
import { getAnalytics } from "../../services/analyticsService";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import {
  Clock3,
  Leaf,
  Package,
  Plus,
  ScanLine,
  Wallet,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import StatCard from "../../components/dashboard/StatCard";
const monthlySavingsData = [
  { month: "Jan", savings: 0 },
  { month: "Feb", savings: 0 },
  { month: "Mar", savings: 0 },
  { month: "Apr", savings: 0 },
  { month: "May", savings: 0 },
  { month: "Jun", savings: 0 },
];

const wasteReductionData = [
  { month: "Jan", wasteSaved: 0 },
  { month: "Feb", wasteSaved: 0 },
  { month: "Mar", wasteSaved: 0 },
  { month: "Apr", wasteSaved: 0 },
  { month: "May", wasteSaved: 0 },
  { month: "Jun", wasteSaved: 0 },
];
function Dashboard() {
  const navigate = useNavigate();
 const [dashboardStats, setDashboardStats] = useState({
  totalItems: 0,
  expiringSoon: 0,
  moneySaved: 0,
  co2Saved: 0,
});

const [inventoryItems, setInventoryItems] = useState([]);

useEffect(() => {
  loadDashboard();
}, []);

const loadDashboard = async () => {
  try {
    const [analyticsRes, inventoryRes] = await Promise.all([
      getAnalytics(),
      getProducts(),
    ]);

    setDashboardStats({
      totalItems: analyticsRes.analytics?.totalProducts || 0,
      expiringSoon: analyticsRes.analytics?.expiringSoon || 0,
      moneySaved: analyticsRes.analytics?.moneyAtRisk || 0,
      co2Saved: analyticsRes.analytics?.expired || 0,
    });

    setInventoryItems(inventoryRes.products || []);
  } catch (err) {
    console.error(err);

    setDashboardStats({
      totalItems: 0,
      expiringSoon: 0,
      moneySaved: 0,
      co2Saved: 0,
    });

    setInventoryItems([]);
  }
};

  return (
    <>
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Items"
          value={dashboardStats.totalItems}
          subtitle="Scan a receipt to add items"
          icon={Package}
          iconBoxClass="bg-blue-100 text-blue-700"
        />

        <StatCard
          title="Expiring Soon"
          value={dashboardStats.expiringSoon}
          subtitle="No products tracked yet"
          icon={Clock3}
          iconBoxClass="bg-amber-100 text-amber-700"
        />

        <StatCard
          title="Money Saved"
          value={`Rs. ${dashboardStats.moneySaved}`}
          subtitle="Savings will appear here"
          icon={Wallet}
          iconBoxClass="bg-green-100 text-green-700"
        />

        <StatCard
          title="CO₂ Saved"
          value={`${dashboardStats.co2Saved} kg`}
          subtitle="Environmental impact"
          icon={Leaf}
          iconBoxClass="bg-emerald-100 text-emerald-700"
        />
      </section>

      <section className="mt-7 grid grid-cols-1 gap-7 xl:grid-cols-2">
        <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Monthly Savings
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              This year
            </p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySavingsData}>
                <defs>
                  <linearGradient
                    id="monthlySavingsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#15803D"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="#15803D"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  tickFormatter={(value) => `Rs. ${value}`}
                />

                <Tooltip
                  formatter={(value) => [`Rs. ${value}`, "Savings"]}
                  contentStyle={{
                    borderRadius: "14px",
                    border: "1px solid #E5E7EB",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="savings"
                  stroke="#15803D"
                  strokeWidth={3}
                  fill="url(#monthlySavingsGradient)"
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {dashboardStats.moneySaved === 0 && (
            <p className="mt-4 text-center text-sm text-gray-400">
              Savings data will appear after products are used and marked as
              consumed.
            </p>
          )}
        </article>

        <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Waste Reduction
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              This year
            </p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteReductionData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  tickFormatter={(value) => `${value} kg`}
                />

                <Tooltip
                  formatter={(value) => [`${value} kg`, "Food Saved"]}
                  contentStyle={{
                    borderRadius: "14px",
                    border: "1px solid #E5E7EB",
                  }}
                />

                <Bar
                  dataKey="wasteSaved"
                  fill="#4DB6AC"
                  radius={[10, 10, 0, 0]}
                  barSize={34}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {dashboardStats.co2Saved === 0 && (
            <p className="mt-4 text-center text-sm text-gray-400">
              Waste-reduction data will appear after inventory activity begins.
            </p>
          )}
        </article>
      </section>

      <section className="mt-7 grid grid-cols-1 gap-7 xl:grid-cols-[1.5fr_1fr]">
        <article className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Inventory Overview
              </h2>

              <p className="mt-1 text-gray-500">
                Your recently added products will appear here
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/inventory")}
              className="flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              <Plus size={19} />
              Add Product
            </button>
          </div>

          {inventoryItems.length === 0 ? (
            <div className="mt-8 rounded-3xl border-2 border-dashed border-gray-200 px-6 py-14 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <Package size={30} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Your inventory is empty
              </h3>

              <p className="mt-2 text-gray-500">
                Scan a grocery receipt or manually add a product.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-4">
              {inventoryItems?.slice(0, 4).map((item) => (
                <div
                key={item._id}
                  className="rounded-2xl border border-gray-100 p-4"
                >
                 {item.productName}
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="rounded-3xl bg-gradient-to-br from-[#0B6B3A] to-[#74B83E] p-7 text-white shadow-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <ScanLine size={28} />
          </div>

          <p className="mt-7 text-sm font-semibold uppercase tracking-widest text-green-100">
            Start Tracking
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Scan Your First Receipt
          </h2>

          <p className="mt-4 leading-7 text-green-50">
            Upload a grocery receipt and ShelfLife AI will detect products.
          </p>

          <button
            type="button"
            onClick={() => navigate("/scan")}
            className="mt-8 rounded-2xl bg-white px-6 py-3 font-bold text-[#0B6B3A] transition hover:scale-105"
          >
            Scan Receipt
          </button>
        </article>
      </section>
    </>
  );
}

export default Dashboard;