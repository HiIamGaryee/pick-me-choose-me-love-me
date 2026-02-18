import api from "../utils/axiosConfig";

export type ReferralCreate = {
  referrer_email: string;
  referee_email: string;
  code: string;
};

export const createReferral = async (payload: ReferralCreate) => {
  const res = await api.post("/referrals", payload);
  return res.data;
};

export const listReferrals = async (limit = 50, offset = 0) => {
  const res = await api.get("/referrals", { params: { limit, offset } });
  return res.data;
};


