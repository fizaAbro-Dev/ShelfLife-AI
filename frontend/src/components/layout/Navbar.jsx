function Navbar() {
  return (
    <nav className="flex items-center justify-between px-12 py-6 bg-white">
      <h1 className="text-2xl font-bold text-green-700">🌿 ShelfLife AI</h1>

      <ul className="hidden md:flex gap-8 text-sm font-semibold text-gray-700">
        <li>Home</li>
        <li>Features</li>
        <li>How It Works</li>
        <li>About</li>
      </ul>

      <button className="bg-green-700 text-white px-6 py-3 rounded-xl">
        Get Started
      </button>
    </nav>
  );
}

export default Navbar;