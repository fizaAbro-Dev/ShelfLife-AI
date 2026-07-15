function CTA() {
  return (
    <section className="px-6 py-24 md:px-16 bg-[#F8FAF9]">
      <div className="mx-auto max-w-7xl rounded-[40px] bg-gradient-to-r from-[#0F6B3E] via-[#178143] to-[#8BC34A] p-16 text-center text-white shadow-2xl">

        <h2 className="text-5xl font-bold">
          Start Saving Food Today
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-green-100">
          Join thousands of users reducing food waste, saving money and helping
          the planet with ShelfLife AI.
        </p>

        <div className="mt-10 flex justify-center gap-5 flex-wrap">

          <button className="rounded-xl bg-white px-8 py-4 font-bold text-[#0F6B3E] hover:scale-105 duration-300">
            Get Started
          </button>

          <button className="rounded-xl border border-white px-8 py-4 font-bold hover:bg-white hover:text-[#0F6B3E] duration-300">
            Watch Demo
          </button>

        </div>

      </div>
    </section>
  );
}

export default CTA;