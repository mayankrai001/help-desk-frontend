import api from "../axios";

export const loginApi = (payload) => {
  return api.post("/auth/login", payload);
};

export const signupApi = (payload) => {
  return api.post("/auth/signup", payload);
};
