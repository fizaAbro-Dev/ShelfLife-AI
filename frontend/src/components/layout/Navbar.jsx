import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5 shadow-sm md:px-12 lg:px-16">
      <button
        type="button"
        onClick={() => scrollToSection("home")}
        className="flex items-center gap-3 text-2xl font-extrabold text-green-700"
      >
        <span>🌿</span>
        <span>ShelfLife AI</span>
      </button>

      <div className="hidden items-center gap-10 md:flex">
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="cursor-pointer font-semibold text-gray-900 transition hover:text-green-700"
        >
          Home
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("features")}
          className="cursor-pointer font-semibold text-gray-900 transition hover:text-green-700"
        >
          Features
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("how-it-works")}
          className="cursor-pointer font-semibold text-gray-900 transition hover:text-green-700"
        >
          How It Works
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("about")}
          className="cursor-pointer font-semibold text-gray-900 transition hover:text-green-700"
        >
          About
        </button>
      </div>

      <button
        type="button"
        onClick={() => navigate("/register")}
        className="rounded-2xl bg-green-700 px-7 py-4 font-semibold text-white transition hover:bg-green-800"
      >
        Get Started
      </button>
    </nav>
  );
}

export default Navbar;