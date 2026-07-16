import {
  Sparkles,
  Brain,
  BellRing,
  Leaf,
} from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    title: "AI Recipe Suggestions",
    desc: "Generate delicious meals using ingredients already available at home.",
  },
  {
    icon: Brain,
    title: "Smart Waste Prediction",
    desc: "AI learns your habits and predicts which foods may go to waste.",
  },
  {
    icon: BellRing,
    title: "Expiry Alerts",
    desc: "Receive reminders before products expire.",
  },
  {
    icon: Leaf,
    title: "Eco Friendly",
    desc: "Reduce food waste and lower your carbon footprint.",
  },
];

function AIBenefits() {
  return (
    <section className="py-24 bg-[#F8FAF9]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-widest text-green-700 font-semibold">
            AI Powered
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Why AI Makes It Better
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
            ShelfLife AI uses artificial intelligence to help you save food,
            money and time.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-16">

          {benefits.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow hover:shadow-xl duration-300 flex gap-6"
              >

                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

                  <Icon size={34} className="text-green-700"/>

                </div>

                <div>

                  <h3 className="font-bold text-xl">

                    {item.title}

                  </h3>

                  <p className="text-gray-600 mt-3">

                    {item.desc}

                  </p>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default AIBenefits;