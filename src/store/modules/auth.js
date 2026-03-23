import { loginApi, signupApi } from "@/api/modules/auth";

const getUserFromStorage = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const state = {
  token: localStorage.getItem("token") || null,
  user: getUserFromStorage(),
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem("token", token);
  },

  SET_USER(state, user) {
    state.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  },

  LOGOUT(state) {
    state.token = null;
    state.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

const actions = {
  async login({ commit }, payload) {
    const res = await loginApi(payload);

    commit("SET_TOKEN", res.data.data.token);
    commit("SET_USER", res.data.data.user);
  },

  async signup({ commit }, payload) {
    const res = await signupApi(payload);

    commit("SET_TOKEN", res.data.data.token);
    commit("SET_USER", res.data.data.user);
  },

  logout({ commit }) {
    commit("LOGOUT");
  },
  async loginMicrosoft() {
    // For OAuth to work correctly, we must redirect the browser directly
    // to the backend endpoint so the user can interact with the Microsoft login page.
    const baseUrl = process.env.VUE_APP_API_URL || "http://localhost:5000/api";
    window.location.href = `${baseUrl}/auth/microsoft`;
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  currentUser: (state) => state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
