import API from "./api";

export const getAnalytics = async () => {
  const res = await API.get("/analytics");
  return res.data;
};