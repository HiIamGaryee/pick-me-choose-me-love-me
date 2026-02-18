import api from "../../utils/axiosConfig";

export const getAdminSales = async (limit = 100, offset = 0) => {
  const res = await api.get("/admin/sales", { params: { limit, offset } });
  return res.data;
};


