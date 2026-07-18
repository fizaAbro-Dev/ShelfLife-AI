import API from "./api";


export const getNotifications = async () => {
  const res = await API.get("/notifications");
  return res.data;
};


export const markNotificationRead = async (id) => {
  const res = await API.put(`/notifications/${id}/read`);
  return res.data;
};


export const deleteNotification = async (id) => {
  const res = await API.delete(`/notifications/${id}`);
  return res.data;
};