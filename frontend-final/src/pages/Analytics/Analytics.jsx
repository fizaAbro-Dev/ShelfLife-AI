import {
  DollarSign,
  Package,
  Leaf,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../services/api";

function Analytics() {

const [analytics, setAnalytics] = useState(null);
const [loading, setLoading] = useState(true);


const stats = [
  {
    title: "Total Inventory Value",
    value: `Rs. ${analytics?.totalValue || 0}`,
    icon: DollarSign,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Products Tracked",
    value: analytics?.totalProducts || 0,
    icon: Package,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Fresh Products",
    value: analytics?.fresh || 0,
    icon: Leaf,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Expired Products",
    value: analytics?.expired || 0,
    icon: TrendingUp,
    color: "bg-orange-100 text-orange-700",
  },
];

useEffect(()=>{

const fetchAnalytics = async()=>{

try{

const res = await API.get("/analytics");

console.log(res.data);

setAnalytics(res.data.analytics);


}catch(error){

console.log(error.response?.data || error.message);

}finally{

setLoading(false);

}

};


fetchAnalytics();

},[]);


if(loading){
return <h2 className="text-2xl font-bold">Loading Analytics...</h2>
}



  return (
    <>
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
            Analytics
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Food Insights Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Track your savings, food waste reduction and environmental impact.
          </p>
        </div>
      </header>

      <section className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon size={28} />
              </div>

              <p className="mt-6 text-gray-500">
                {item.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {item.value}
              </h2>
            </article>
          );
        })}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Monthly Savings
          </h2>

        <p className="mt-2 text-gray-500">
You currently have {analytics?.fresh || 0} fresh products and
Rs. {analytics?.moneyAtRisk || 0} at risk.
</p>
          <div className="mt-8 flex h-[320px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
            <div className="text-center">
              <DollarSign
                size={55}
                className="mx-auto text-green-700"
              />

            <h3 className="mt-4 text-xl font-bold text-gray-800">
  {analytics?.totalProducts || 0} Products Analyzed
</h3>

<p className="mt-2 text-gray-500">
  {analytics?.fresh || 0} fresh, 
  {analytics?.expiringSoon || 0} expiring soon, and, 
  {analytics?.expired || 0} expired products detected.
</p>
            </div>
          </div>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Categories
          </h2>

          <p className="mt-2 text-gray-500">
            Product categories will appear here.
          </p>

          <div className="mt-8 flex h-[320px] items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50">
            <div className="text-center">
              <Package
                size={55}
                className="mx-auto text-blue-700"
              />

            <p className="mt-4 font-semibold text-gray-500">
  Category insights coming soon
</p>
            </div>
          </div>
        </article>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">
          AI Insights
        </h2>

        <p className="mt-2 text-gray-500">
          Backend and AI will automatically generate useful insights based on
          your inventory.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl bg-green-50 p-5">
            <Leaf
              className="text-green-700"
              size={34}
            />

            <h3 className="mt-4 text-lg font-bold">
              Waste Reduction
            </h3>
<p className="mt-2 text-sm text-gray-600">
  You saved {analytics?.fresh || 0} products from possible waste.
</p>
          </article>

          <article className="rounded-2xl bg-blue-50 p-5">
            <DollarSign
              className="text-blue-700"
              size={34}
            />

            <h3 className="mt-4 text-lg font-bold">
              Money Savings
            </h3>


<p className="mt-2 text-sm text-gray-600">
  Rs. {analytics?.moneyAtRisk || 0} inventory value is currently at risk.
</p>
            </article>

          <article className="rounded-2xl bg-orange-50 p-5">
            <TrendingUp
              className="text-orange-600"
              size={34}
            />

            <h3 className="mt-4 text-lg font-bold">
              Environmental Impact
            </h3>

<p className="mt-2 text-sm text-gray-600">
  Keep consuming fresh products before expiry to reduce food waste.
</p>
           
          </article>
        </div>
      </section>
    </>
  );
}

export default Analytics;