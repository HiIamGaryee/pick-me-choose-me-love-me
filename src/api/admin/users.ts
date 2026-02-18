import api from "../../utils/axiosConfig";

export type UserRecord = {
  id: number;
  name: string;
  email: string;
  age?: number | null;
  role: "admin" | "member";
  is_active: boolean;
  created_at: string;
};

const ok = <T>(r: any): T => {
  if (r.status >= 200 && r.status < 300) return r.data;
  throw new Error(r.statusText || "API Error");
};

export const getAllUsers = async (skip = 0, limit = 100): Promise<UserRecord[]> => {
  const r = await api.get(`/admin/users/?skip=${skip}&limit=${limit}`);
  return ok<UserRecord[]>(r);
};

export const resetUserPassword = async (userId: number, newPassword: string) => {
  const r = await api.put(`/admin/users/${userId}/password`, { new_password: newPassword });
  return ok<{ message: string }>(r);
};

export const updateUserByAdmin = async (userId: number, data: Partial<Pick<UserRecord, "name" | "email" | "age" | "is_active" | "role">>) => {
  const r = await api.put(`/admin/users/${userId}`, data);
  return ok<UserRecord>(r);
};


