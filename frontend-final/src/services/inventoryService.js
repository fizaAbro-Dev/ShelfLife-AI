import API from "./api";

export const getProducts = async () => {
  const res = await API.get("/inventory");
  return res.data;
};

export const addProduct = async (productData) => {
  const res = await API.post("/inventory", productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateProduct = async (id, productData) => {
  const res = await API.put(`/inventory/${id}`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await API.delete(`/inventory/${id}`);
  return res.data;
};



export const addInventoryProduct = async (productData) => {

  const res = await API.post(
    "/inventory",
    productData
  );

  return res.data;
};