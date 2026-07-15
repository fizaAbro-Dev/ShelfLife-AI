import heroImage from "../../assets/images/hero.png";

function Hero() {
  return (
    <section className="grid min-h-[82vh] grid-cols-1 items-center gap-12 bg-[#F8FAF9] px-6 py-14 md:grid-cols-2 md:px-16">
      <div>
        <div className="mb-6 flex flex-wrap gap-3 text-sm font-semibold text-[#0F6B3E]">
          <span>🌱 AI Powered</span>
          <span>• Reduce Waste</span>
          <span>• Save Money</span>
        </div>

        <h1 className="text-5xl font-extrabold leading-tight text-gray-950 md:text-7xl">
          Waste Less,
          <br />
          <span className="text-[#138A45]">Live More.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
          ShelfLife AI helps you track expiry dates, get AI recipe suggestions
          and reduce food waste effortlessly.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="rounded-xl bg-[#138A45] px-7 py-4 font-semibold text-white shadow-md transition hover:bg-[#0F6B3E]">
            Get Started
          </button>

          <button className="rounded-xl border border-[#138A45] bg-white px-7 py-4 font-semibold text-[#138A45] transition hover:bg-green-50">
            ▶ Watch Demo
          </button>
        </div>
      </div>

      <div className="relative flex justify-center">
        <div className="absolute h-[430px] w-[430px] rounded-full bg-[#E6F5EA]"></div>

       <img
          src={heroImage}
          alt="Fresh vegetables"
          className="relative z-10 w-full max-w-[470px] object-contain"
        />

        <div className="absolute left-0 top-20 z-20 rounded-2xl bg-white p-5 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900">18kg</h3>
          <p className="text-sm text-gray-500">CO₂ Saved</p>
        </div>

        <div className="absolute bottom-5 right-4 z-20 rounded-2xl bg-white p-5 shadow-xl">
          <p className="text-sm text-gray-500">Money Saved</p>
          <h3 className="text-xl font-bold text-gray-900">Rs. 3,450</h3>
        </div>
      </div>
    </section>
  );
}

export default Hero;