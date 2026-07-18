import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Search, User } from "lucide-react";
import API from "../../services/api";

const DEFAULT_USERNAME = "ShelfLife User";

function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [profileImage, setProfileImage] = useState("");
const [notificationCount, setNotificationCount] = useState(0);
    const hideSearchPages = [
  "/profile",
  "/notifications",
  "/analytics",
  "/recipes",
];
const hideNotificationPages = ["/profile"];

const showNotification = !hideNotificationPages.includes(location.pathname);

  const showSearch = !hideSearchPages.includes(location.pathname);

 async function loadProfile() {
  try {
    const res = await API.get("/auth/me");

    setUsername(res.data.user.name);

    localStorage.setItem(
      "shelflife_user_name",
      res.data.user.name
    );

    const storedImage =
      localStorage.getItem("shelflife_profile_image");

    setProfileImage(storedImage || "");

  } catch (error) {
    console.log(error);
  }
}


async function loadNotifications() {
  try {
    const res = await API.get("/notifications");

    console.log("Notifications:", res.data.notifications);

    const unread = res.data.notifications.filter(
      (item) => !item.isRead
    );

    console.log("Unread Count:", unread.length);

    setNotificationCount(unread.length);
  } catch (err) {
    console.log(err);
  }
}
  useEffect(() => {
  loadProfile();
  loadNotifications();

  function handleProfileUpdate() {
    loadProfile();
  }

  function handleNotificationUpdate() {
    loadNotifications();
  }

  window.addEventListener(
    "shelflife-profile-updated",
    handleProfileUpdate
  );

  window.addEventListener(
    "notification-updated",
    handleNotificationUpdate
  );

  return () => {
    window.removeEventListener(
      "shelflife-profile-updated",
      handleProfileUpdate
    );

    window.removeEventListener(
      "notification-updated",
      handleNotificationUpdate
    );
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

    {notificationCount > 0 && (
  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
    {notificationCount}
  </span>
)}
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