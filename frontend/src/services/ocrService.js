import API from "./api";

export const scanReceipt = async (image) => {
  const data = new FormData();

  data.append("image", image);

  const res = await API.post("/ocr/scan", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};