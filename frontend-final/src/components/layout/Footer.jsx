import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  const [openMenu, setOpenMenu] = useState(null);

  const githubMembers = [
    {
      name: "Fiza Zulfiqar (Team Leader)",
      url: "https://github.com/fizaAbro-Dev",
    },
    {
      name: "Sonia Rubab",
      url: "https://github.com/soniapathan331-netizen",
    },
    {
      name: "Khadeeja Memon",
      url: "https://github.com/KhadeejaMemon",
    },
  ];

  const linkedinMembers = [
    {
      name: "Fiza Zulfiqar (Team Leader)",
      url: "https://www.linkedin.com/in/fiza-zulifqar/",
    },
    {
      name: "Sonia Rubab",
      url: "https://www.linkedin.com/in/sr-pathan-aa27003a1",
    },
    {
      name: "Khadeeja Memon",
      url: "https://www.linkedin.com/in/khadeeja-memon-cs/",
    },
  ];

  function toggleMenu(menuName) {
    setOpenMenu((currentMenu) =>
      currentMenu === menuName ? null : menuName
    );
  }

  function renderDropdown(title, icon, menuName, members) {
    const Icon = icon;
    const isOpen = openMenu === menuName;

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => toggleMenu(menuName)}
          className="flex w-full items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-3 text-left font-semibold transition hover:bg-white/20"
        >
          <span className="flex items-center gap-2">
            <Icon size={19} />
            {title}
          </span>

          <ChevronDown
            size={18}
            className={`transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0B5B35] shadow-xl">
            {members.map((member) => (
              <a
                key={member.name}
                href={member.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-sm text-green-50 transition hover:bg-white/10 hover:text-white"
              >
                {member.name}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

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
          <h3 className="mb-5 text-xl font-bold">Our Team</h3>

          <div className="space-y-3">
            {renderDropdown(
  "GitHub",
  FaGithub,
  "github",
  githubMembers
)}

           {renderDropdown(
  "LinkedIn",
  FaLinkedin,
  "linkedin",
  linkedinMembers
)}
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