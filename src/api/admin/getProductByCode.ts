import api from "../../utils/axiosConfig";

export const getProductByCode = async (code: string) => {
  const response = await api.get(`/product/code/${encodeURIComponent(code)}`);
  return response.data;
};


