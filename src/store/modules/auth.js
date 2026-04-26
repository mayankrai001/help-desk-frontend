import { loginApi, signupApi, teamsSSOApi, getMeApi, logoutApi } from "@/api/modules/auth";

const state = {
  user: null,
  isAuthChecked: false, // Prevents flickering before checkAuth finishes
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
    state.isAuthChecked = true;
  },

  LOGOUT(state) {
    state.user = null;
  },

  SET_AUTH_CHECKED(state, status) {
    state.isAuthChecked = status;
  }
};

const actions = {
  async login({ commit }, payload) {
    const res = await loginApi(payload);
    commit("SET_USER", res.data.data.user);
  },

  async signup({ commit }, payload) {
    const res = await signupApi(payload);
    commit("SET_USER", res.data.data.user);
  },

  async logout({ commit }) {
    try {
      await logoutApi();
    } catch (e) {
      console.error("Logout API failed", e);
    }
    commit("LOGOUT");
  },

  async checkAuth({ commit }) {
    try {
      const res = await getMeApi();
      if (res.data && res.data.data && res.data.data.user) {
        commit("SET_USER", res.data.data.user);
      } else {
        commit("LOGOUT");
      }
    } catch (error) {
      commit("LOGOUT");
    } finally {
      commit("SET_AUTH_CHECKED", true);
    }
  },

  async loginMicrosoft() {
    // For OAuth to work correctly, we must redirect the browser directly
    // to the backend endpoint so the user can interact with the Microsoft login page.
    const baseUrl = process.env.VUE_APP_API_URL || "http://localhost:5000/api";
    window.location.href = `${baseUrl}/auth/microsoft`;
  },
  
  async loginTeamsSSO({ commit }, token) {
    const res = await teamsSSOApi(token);
    commit("SET_USER", res.data.data.user);
  },
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  currentUser: (state) => state.user,
  isAuthChecked: (state) => state.isAuthChecked,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
