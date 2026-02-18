import api from "../utils/axiosConfig";
import { checkPostResponse } from "../utils/function";

export type ProfileResponse = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "member";
  age?: number | null;
};

export const getMe = async () => {
  const response = await api.get<ProfileResponse>("/users/me");
  return checkPostResponse(response);
};

export const updateMyProfile = async (data: { name?: string; email?: string; age?: number }) => {
  const response = await api.put<ProfileResponse>("/members/profile", data);
  return checkPostResponse(response);
};

export const changeMyPassword = async (current_password: string, new_password: string) => {
  const response = await api.put<{ message: string }>("/users/me/password", { current_password, new_password });
  return checkPostResponse(response);
};


