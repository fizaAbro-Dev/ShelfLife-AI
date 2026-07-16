import {
  Wallet,
  PackageCheck,
  Leaf,
  Clock3,
} from "lucide-react";

const stats = [
  {
    icon: Wallet,
    value: "Rs. 3,450",
    label: "Money Saved",
  },
  {
    icon: PackageCheck,
    value: "45 Items",
    label: "Food Saved",
  },
  {
    icon: Leaf,
    value: "18 kg",
    label: "CO₂ Saved",
  },
  {
    icon: Clock3,
    value: "12 Items",
    label: "Expiring Soon",
  },
];

function Statistics() {
  return (
    <section className="bg-white px-6 py-20 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-green-700">
            Real Impact
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
            Small Actions, Big Savings
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            ShelfLife AI helps users save food, money and reduce environmental
            impact through smarter inventory management.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="rounded-3xl border border-green-100 bg-[#F8FAF9] p-7 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                  <Icon size={28} />
                </div>

                <h3 className="mt-5 text-3xl font-bold text-gray-900">
                  {stat.value}
                </h3>

                <p className="mt-2 text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Statistics;