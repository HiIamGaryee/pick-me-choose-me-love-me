import api from "../utils/axiosConfig";

export type OrderItem = { product_code: string; price: number; quantity: number };
export type Order = {
  id: number;
  user_email: string;
  address: string;
  mobile: string;
  status: string;
  total: number;
  shipping: number;
  created_at: string;
  items: OrderItem[];
};

export const getSalesHistory = async (limit = 50, offset = 0): Promise<{ data: Order[]; total: number; limit: number; offset: number }> => {
  const res = await api.get("/sales/history", { params: { limit, offset } });
  return res.data;
};


