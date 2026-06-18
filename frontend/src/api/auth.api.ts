import api from "./axios";

export const authApi = {
  requestCode: (email: string) =>
    api.post("/auth/signup", { email }),

  verifyCode: (email: string, verificationCode: string) =>
    api.post("/auth/signin", { email, verificationCode }),

  me: () => api.get("/auth/me"),
};