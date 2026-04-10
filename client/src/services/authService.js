import api from "./api";

export const requestOtp = async (phone) => {
  const res = await api.post("/auth/request-otp", { phone });
  return res.data;
};

export const verifyOtp = async (payload) => {
  const res = await api.post("/auth/verify-otp", payload);
  return res.data;
};
