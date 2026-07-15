function Footer() {
  return (
    <footer className="bg-[#0F6B3E] px-6 py-16 text-white md:px-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <h2 className="text-3xl font-bold">🌿 ShelfLife AI</h2>

          <p className="mt-5 leading-7 text-green-100">
            Reduce food waste with AI-powered inventory tracking, smart recipes
            and expiry reminders.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-xl font-bold">Company</h3>

          <ul className="space-y-3 text-green-100">
            <li>Home</li>
            <li>Features</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-xl font-bold">Features</h3>

          <ul className="space-y-3 text-green-100">
            <li>Inventory</li>
            <li>Recipes</li>
            <li>Analytics</li>
            <li>Notifications</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-xl font-bold">Follow Us</h3>

          <div className="flex gap-4">
            <button className="rounded-xl bg-white/10 px-4 py-3">
              Instagram
            </button>

            <button className="rounded-xl bg-white/10 px-4 py-3">
              LinkedIn
            </button>

            <button className="rounded-xl bg-white/10 px-4 py-3">
              GitHub
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl border-t border-green-700 pt-8 text-center text-green-200">
        © 2026 ShelfLife AI. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;