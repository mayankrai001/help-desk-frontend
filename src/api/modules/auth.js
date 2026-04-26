import api from "../axios";

export const loginApi = (payload) => {
  return api.post("/auth/login", payload);
};

export const signupApi = (payload) => {
  return api.post("/auth/signup", payload);
};

export const loginMicrosoft = () => {
  return api.get("/auth/microsoft");
};

export const teamsSSOApi = (token) => {
  return api.post("/auth/teams-sso", { token });
};

export const getMeApi = () => {
  return api.get("/auth/me");
};

export const logoutApi = () => {
  return api.post("/auth/logout");
};
