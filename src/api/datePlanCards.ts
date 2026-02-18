import api from "../utils/axiosConfig";

export type DatePlanCardList = {
  id: number;
  title: string;
  subtitle?: string;
  category?: string;
  tags?: string;
  thumbnail_url?: string;
  price: number;
  currency: string;
  is_featured: boolean;
  popularity: number;
  created_at: string;
};

const ok = <T>(r: any): T => {
  if (r.status >= 200 && r.status < 300) return r.data;
  throw new Error(r.statusText || "API Error");
};

export const listPublicDatePlanCards = async (params: {
  q?: string;
  category?: string;
  tag?: string;
  is_featured?: boolean;
  min_price?: number;
  max_price?: number;
  sort?: string;
  skip?: number;
  limit?: number;
} = {}): Promise<DatePlanCardList[]> => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) query.set(k, String(v));
  });
  const r = await api.get(`/dateplan-cards/?${query.toString()}`);
  return ok<DatePlanCardList[]>(r);
};

export type DatePlanCard = {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  category?: string;
  tags?: string;
  thumbnail_url?: string;
  price: number;
  currency: string;
  status: "draft" | "published" | "archived";
  is_featured: boolean;
  popularity: number;
  created_at: string;
  updated_at: string;
  owner_id?: number;
};

export const getPublicDatePlanCard = async (id: number): Promise<DatePlanCardList> => {
  const r = await api.get(`/dateplan-cards/public/${id}`);
  return ok<DatePlanCardList>(r);
};

export const getAdminDatePlanCard = async (id: number): Promise<DatePlanCard> => {
  const r = await api.get(`/dateplan-cards/${id}`);
  return ok<DatePlanCard>(r);
};


