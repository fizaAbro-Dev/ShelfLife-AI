import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Search, User } from "lucide-react";

const DEFAULT_USERNAME = "ShelfLife User";

function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [profileImage, setProfileImage] = useState("");

    const hideSearchPages = [
  "/profile",
  "/notifications",
  "/analytics",
  "/recipes",
];
const hideNotificationPages = ["/profile"];

const showNotification = !hideNotificationPages.includes(location.pathname);

  const showSearch = !hideSearchPages.includes(location.pathname);

  function loadProfile() {
    const storedName = localStorage.getItem("shelflife_user_name");
    const storedImage = localStorage.getItem("shelflife_profile_image");

    setUsername(storedName || DEFAULT_USERNAME);
    setProfileImage(storedImage || "");
  }

  useEffect(() => {
    loadProfile();

    function handleProfileUpdate() {
      loadProfile();
    }

    window.addEventListener(
      "shelflife-profile-updated",
      handleProfileUpdate
    );

    window.addEventListener("storage", handleProfileUpdate);

    return () => {
      window.removeEventListener(
        "shelflife-profile-updated",
        handleProfileUpdate
      );

      window.removeEventListener("storage", handleProfileUpdate);
    };
  }, []);

  const firstLetter = username.trim().charAt(0).toUpperCase() || "U";

  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5 md:px-8">
      <div>
        <p className="text-sm text-gray-500">Welcome back</p>

        <h2 className="text-2xl font-bold text-gray-900">
          Hello, {username} 👋
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="hidden items-center gap-3 rounded-2xl bg-gray-100 px-4 py-3 md:flex">
            <Search size={19} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              className="w-56 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        )}

       {showNotification && (
  <button
    type="button"
    onClick={() => navigate("/notifications")}
    className="relative rounded-2xl border border-gray-200 p-3 text-gray-600 transition hover:bg-green-50 hover:text-green-700"
    aria-label="Open notifications"
  >
    <Bell size={21} />

    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
  </button>
)}

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-green-100 font-bold text-green-700">
            {profileImage ? (
              <img
                src={profileImage}
                alt={username}
                className="h-full w-full object-cover"
              />
            ) : firstLetter ? (
              firstLetter
            ) : (
              <User size={21} />
            )}
          </div>

          <div className="hidden sm:block">
            <p className="max-w-40 truncate text-sm font-bold text-gray-900">
              {username}
            </p>

            <p className="text-xs text-gray-500">ShelfLife User</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;