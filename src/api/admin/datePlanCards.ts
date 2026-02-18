import api from "../../utils/axiosConfig";

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

export type DatePlanCardCreate = Omit<DatePlanCard, "id" | "created_at" | "updated_at">;
export type DatePlanCardUpdate = Partial<DatePlanCardCreate>;

const ok = <T>(r: any): T => {
  if (r.status >= 200 && r.status < 300) return r.data;
  throw new Error(r.statusText || "API Error");
};

export const adminListCards = async (params: { q?: string; status_filter?: string; category?: string; owner_id?: number; skip?: number; limit?: number } = {}): Promise<DatePlanCard[]> => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) sp.set(k, String(v));
  });
  const r = await api.get(`/admin/dateplan-cards/?${sp.toString()}`);
  return ok<DatePlanCard[]>(r);
};

export const adminCreateCard = async (data: DatePlanCardCreate): Promise<DatePlanCard> => {
  const r = await api.post(`/admin/dateplan-cards/`, data);
  return ok<DatePlanCard>(r);
};

export const adminUpdateCard = async (id: number, data: DatePlanCardUpdate): Promise<DatePlanCard> => {
  const r = await api.put(`/admin/dateplan-cards/${id}`, data);
  return ok<DatePlanCard>(r);
};

export const adminDeleteCard = async (id: number): Promise<{ message: string }> => {
  const r = await api.delete(`/admin/dateplan-cards/${id}`);
  return ok<{ message: string }>(r);
};


