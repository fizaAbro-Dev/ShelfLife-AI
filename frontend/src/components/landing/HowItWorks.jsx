import {
  ScanLine,
  Package,
  BellRing,
  ChefHat,
} from "lucide-react";

const steps = [
  {
    icon: ScanLine,
    title: "Scan Receipt",
    desc: "Upload your grocery receipt or food label.",
  },
  {
    icon: Package,
    title: "Inventory Updated",
    desc: "ShelfLife AI automatically creates your inventory.",
  },
  {
    icon: BellRing,
    title: "Get Reminders",
    desc: "Receive notifications before items expire.",
  },
  {
    icon: ChefHat,
    title: "Cook Smart",
    desc: "AI suggests recipes using expiring ingredients.",
  },
];

function HowItWorks() {
  return (
   <section
  id="how-it-works"
  className="scroll-mt-24 bg-white py-24"
>

      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <p className="text-green-700 font-semibold uppercase tracking-widest">
            Simple Process
          </p>

          <h2 className="text-5xl font-bold mt-3">
            How ShelfLife AI Works
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Four simple steps to reduce food waste and save money every day.
          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-20">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <div
                key={index}
                className="relative bg-[#F8FAF9] rounded-3xl p-8 text-center hover:shadow-xl duration-300"
              >

                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">

                  {index + 1}

                </div>

                <div className="w-20 h-20 rounded-full bg-green-100 mx-auto flex items-center justify-center mt-6">

                  <Icon size={38} className="text-green-700"/>

                </div>

                <h3 className="font-bold text-xl mt-8">

                  {step.title}

                </h3>

                <p className="text-gray-600 mt-3">

                  {step.desc}

                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;