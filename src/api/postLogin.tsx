import api from "../utils/axiosConfig";
import { checkPostResponse } from "../utils/function";

export type LoginParams = {
  email: string;
  password: string;
};

export type JwtLoginResponse = {
  access_token: string;
  token_type: string;
};

export const postAdminLogin = async (params: LoginParams) => {
  const response = await api.post<JwtLoginResponse>("/admin/login", params);
  return checkPostResponse(response);
};

export const postMemberLogin = async (params: LoginParams) => {
  const response = await api.post<JwtLoginResponse>("/member/login", params);
  return checkPostResponse(response);
};

// Backward-compat shim: try admin first, then member
export const postLogin = async (params: LoginParams) => {
  try {
    return await postAdminLogin(params);
  } catch (_) {
    return await postMemberLogin(params);
  }
};
