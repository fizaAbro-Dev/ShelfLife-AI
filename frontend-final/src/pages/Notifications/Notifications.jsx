import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CheckCheck,
  AlertCircle,
  PackageCheck,
  ScanLine,
} from "lucide-react";
import API from "../../services/api";


const filters = ["All", "Unread", "Expiry", "System"];
function Notifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredNotifications = useMemo(() => {
    if (selectedFilter === "All") {
      return notifications;
    }
if (selectedFilter === "Unread") {
 return notifications.filter((item) => !item.isRead);
}

    return notifications.filter(
      (item) =>
        item.type?.toLowerCase() === selectedFilter.toLowerCase()
    );
  }, [notifications, selectedFilter]);

  function markAllAsRead() {
    setNotifications((currentNotifications) =>
      currentNotifications.map((item) => ({
        ...item,
        isRead: true,
      }))
    );
  }
async function markAsRead(notificationId) {

 try{

   await API.put(`/notifications/${notificationId}/read`);
window.dispatchEvent(new Event("notification-updated"));
   setNotifications((currentNotifications) =>
     currentNotifications.map((item) =>
       item._id === notificationId
         ? {
             ...item,
             isRead: true,
           }
         : item
     )
   );

 }catch(error){

   console.log(error.response?.data || error.message);

 }

}
  function getNotificationStyle(type) {
    if (type === "expiry") {
      return {
        icon: AlertCircle,
        iconClass: "bg-amber-100 text-amber-700",
      };
    }

    if (type === "success") {
      return {
        icon: PackageCheck,
        iconClass: "bg-green-100 text-green-700",
      };
    }

    return {
      icon: Bell,
      iconClass: "bg-blue-100 text-blue-700",
    };
  }

async function markAllAsRead() {
  try {
    await API.put("/notifications/read-all");

    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        isRead: true,
      }))
    );

    window.dispatchEvent(
      new Event("notification-updated")
    );

  } catch (error) {
    console.log(error);
  }
}
  useEffect(() => {

  const fetchNotifications = async () => {

    try {

      const res = await API.get("/notifications");

      console.log(res.data);

      setNotifications(res.data.notifications);

    } catch(error){

      console.log(error.response?.data || error.message);

    } finally {

      setLoading(false);

    }

  };


  fetchNotifications();

}, []);

if(loading){
 return <h2 className="text-2xl font-bold">
 Loading Notifications...
 </h2>
}
  return (
    <>
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
            Notifications
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Alerts and Updates
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Expiry reminders, receipt updates and important inventory alerts will
            appear here.
          </p>
        </div>

        <button
          type="button"
          onClick={markAllAsRead}
          disabled={notifications.length === 0}
          className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
            notifications.length === 0
              ? "cursor-not-allowed bg-gray-200 text-gray-400"
              : "bg-green-700 text-white hover:bg-green-800"
          }`}
        >
          <CheckCheck size={19} />
          Mark All as Read
        </button>
      </header>

      <section className="mt-8 rounded-3xl bg-white p-5 shadow-sm">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => {
            const isSelected = selectedFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  isSelected
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      {filteredNotifications.length === 0 ? (
        <section className="mt-8 rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-700">
            <Bell size={46} />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            No Notifications Yet
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-500">
            Alerts will appear after you add inventory items, scan receipts or
            receive expiry reminders from the backend.
          </p>

          <div className="mx-auto mt-8 flex max-w-md items-start gap-3 rounded-2xl bg-green-50 p-4 text-left">
            <ScanLine
              size={22}
              className="mt-1 shrink-0 text-green-700"
            />

            <p className="text-sm leading-6 text-green-800">
              Scan a receipt or manually add a product to begin receiving useful
              alerts.
            </p>
          </div>
        </section>
      ) : (
        <section className="mt-8 space-y-4">
          {filteredNotifications.map((notification) => {
            const style = getNotificationStyle(notification.type);
            const Icon = style.icon;

            return (
              <article
                key={notification._id}
                className={`rounded-3xl border bg-white p-5 shadow-sm transition ${
                 notification.isRead
                    ? "border-gray-100"
                    : "border-green-200"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${style.iconClass}`}
                  >
                    <Icon size={23} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="font-bold text-gray-900">
                          {notification.title}
                        </h2>

                        <p className="mt-2 leading-6 text-gray-500">
                          {notification.message}
                        </p>
                      </div>

                      <span className="shrink-0 text-xs text-gray-400">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {!notification.isRead && (
                      <button
                        type="button"
                        onClick={() => markAsRead(notification._id)}
                        className="mt-4 text-sm font-bold text-green-700 hover:text-green-800"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </>
  );
}

export default Notifications;