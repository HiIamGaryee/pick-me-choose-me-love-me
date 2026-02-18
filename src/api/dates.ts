import api from "../utils/axiosConfig";

export type DatePlan = {
  id: number;
  title: string;
  description?: string;
  location?: string;
  scheduled_at?: string | null;
  status: "planned" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
  owner_id: number;
};

export type DatePlanCreate = {
  title: string;
  description?: string;
  location?: string;
  scheduled_at?: string | null;
  status?: "planned" | "completed" | "cancelled";
};

const ok = <T>(r: any): T => {
  if (r.status >= 200 && r.status < 300) return r.data;
  throw new Error(r.statusText || "API Error");
};

export const createDatePlan = async (data: DatePlanCreate): Promise<DatePlan> => {
  const r = await api.post("/dates/", data);
  return ok<DatePlan>(r);
};

export const listMyDatePlans = async (skip = 0, limit = 100): Promise<DatePlan[]> => {
  const r = await api.get(`/dates/?skip=${skip}&limit=${limit}`);
  return ok<DatePlan[]>(r);
};

export const listAllDatePlansAdmin = async (skip = 0, limit = 200): Promise<DatePlan[]> => {
  const r = await api.get(`/admin/dates/?skip=${skip}&limit=${limit}`);
  return ok<DatePlan[]>(r);
};

export const getDatePlan = async (id: number): Promise<DatePlan> => {
  const r = await api.get(`/dates/${id}`);
  return ok<DatePlan>(r);
};

export const updateDatePlan = async (id: number, data: Partial<DatePlanCreate>): Promise<DatePlan> => {
  const r = await api.put(`/dates/${id}`, data);
  return ok<DatePlan>(r);
};

export const deleteDatePlan = async (id: number): Promise<{ message: string }> => {
  const r = await api.delete(`/dates/${id}`);
  return ok<{ message: string }>(r);
};


