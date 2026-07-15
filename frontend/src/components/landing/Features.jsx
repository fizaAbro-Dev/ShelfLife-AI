import {
  CalendarClock,
  CookingPot,
  Trash2,
  WalletCards,
} from "lucide-react";

const features = [
  {
    icon: CalendarClock,
    title: "AI Expiry Tracking",
    description: "Know what is expiring and get reminders before food goes bad.",
  },
  {
    icon: CookingPot,
    title: "Smart Recipes",
    description: "Get AI recipes using the ingredients already available at home.",
  },
  {
    icon: Trash2,
    title: "Reduce Waste",
    description: "Use expiring items first and reduce unnecessary food waste.",
  },
  {
    icon: WalletCards,
    title: "Save Money",
    description: "Buy smarter, avoid extra groceries and track your savings.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="rounded-t-[48px] bg-gradient-to-br from-[#0B6B3A] via-[#187C42] to-[#79B83F] px-6 py-16 md:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-green-100">
            Smart food management
          </p>

          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Why ShelfLife AI?
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-green-50">
            Track food, receive useful reminders and make better decisions before
            products expire.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-3xl bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-[#0F6B3E] transition group-hover:bg-[#0F6B3E] group-hover:text-white">
                  <Icon size={24} strokeWidth={2} />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;