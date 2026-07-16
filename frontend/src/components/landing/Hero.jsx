import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, ScanLine, Sparkles, ChefHat, X } from "lucide-react";

import heroImage from "../../assets/images/empty-inventory.png.png";

function Hero() {
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);

  function handleGetStarted() {
    const token = localStorage.getItem("shelflife_token");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  }

  function closeDemo() {
    setShowDemo(false);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F8FAF9] via-white to-[#F1FBEA] px-6 py-14 md:px-12 lg:px-16">
        <div className="pointer-events-none absolute -left-36 top-28 h-80 w-80 rounded-full bg-green-100/70 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-lime-100/70 blur-3xl" />

        <div className="relative mx-auto grid min-h-[82vh] max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative z-10">
            <div className="mb-7 flex flex-wrap gap-3 text-sm font-semibold text-[#0F6B3E]">
              <span className="rounded-full bg-green-100 px-4 py-2">
                AI Powered
              </span>

              <span className="rounded-full bg-green-100 px-4 py-2">
                Reduce Waste
              </span>

              <span className="rounded-full bg-green-100 px-4 py-2">
                Save Money
              </span>
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.06] text-gray-950 md:text-6xl xl:text-7xl">
              Waste Less,
              <br />
              <span className="text-[#138A45]">Live More.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
              Track your groceries, receive expiry reminders and discover smart
              recipes using the ingredients already available in your kitchen.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleGetStarted}
                className="rounded-2xl bg-[#138A45] px-8 py-4 font-semibold text-white shadow-lg shadow-green-800/15 transition duration-300 hover:-translate-y-1 hover:bg-[#0F6B3E] hover:shadow-xl"
              >
                Get Started
              </button>

              <button
                type="button"
                onClick={() => setShowDemo(true)}
                className="flex items-center gap-2 rounded-2xl border border-[#138A45] bg-white px-8 py-4 font-semibold text-[#138A45] transition duration-300 hover:-translate-y-1 hover:bg-green-50"
              >
                <Play size={19} fill="currentColor" />
                Watch Demo
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500">
              <span>✓ Easy inventory tracking</span>
              <span>✓ Smart expiry reminders</span>
              <span>✓ AI recipe suggestions</span>
            </div>
          </div>

          <div className="relative flex min-h-[520px] items-center justify-center lg:min-h-[600px]">
            <div className="absolute h-[440px] w-[440px] rounded-full bg-gradient-to-br from-green-100/90 via-green-50/60 to-transparent blur-xl md:h-[520px] md:w-[520px]" />

            <div className="absolute h-[380px] w-[380px] rounded-full border border-green-100 bg-white/20 md:h-[460px] md:w-[460px]" />

            <div className="relative z-10 flex w-full items-center justify-center">
              <img
                src={heroImage}
                alt="Fresh grocery basket"
                className="w-full max-w-[650px] object-contain drop-shadow-[0_35px_55px_rgba(22,101,52,0.18)]"
              />
            </div>
          </div>
        </div>
      </section>

      {showDemo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-8"
          onClick={closeDemo}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl sm:p-9"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
                  Product Demo
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  How ShelfLife AI Works
                </h2>

                <p className="mt-3 text-gray-500">
                  See how groceries move from a receipt into a smart personal
                  inventory.
                </p>
              </div>

              <button
                type="button"
                onClick={closeDemo}
                className="rounded-xl bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
                aria-label="Close demo"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-green-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-white">
                  <ScanLine size={24} />
                </div>

                <p className="mt-5 text-sm font-bold text-green-700">
                  STEP 01
                </p>

                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  Upload Receipt
                </h3>

                <p className="mt-2 leading-6 text-gray-600">
                  Upload a grocery receipt or manually enter a food product.
                </p>
              </div>

              <div className="rounded-3xl bg-green-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-white">
                  <Sparkles size={24} />
                </div>

                <p className="mt-5 text-sm font-bold text-green-700">
                  STEP 02
                </p>

                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  AI Detects Products
                </h3>

                <p className="mt-2 leading-6 text-gray-600">
                  OCR and AI extract product information for user review.
                </p>
              </div>

              <div className="rounded-3xl bg-green-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-white">
                  <ScanLine size={24} />
                </div>

                <p className="mt-5 text-sm font-bold text-green-700">
                  STEP 03
                </p>

                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  Track Inventory
                </h3>

                <p className="mt-2 leading-6 text-gray-600">
                  Saved products become part of the user's personal inventory.
                </p>
              </div>

              <div className="rounded-3xl bg-green-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-white">
                  <ChefHat size={24} />
                </div>

                <p className="mt-5 text-sm font-bold text-green-700">
                  STEP 04
                </p>

                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  Get Smart Suggestions
                </h3>

                <p className="mt-2 leading-6 text-gray-600">
                  Receive expiry alerts and recipe ideas after inventory data is
                  available.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={closeDemo}
                className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  closeDemo();
                  handleGetStarted();
                }}
                className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
              >
                Start Using ShelfLife AI
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;