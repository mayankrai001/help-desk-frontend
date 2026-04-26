import { getSubAdminsApi, addSubAdminApi, removeSubAdminApi } from "@/api/modules/subAdmin";

const state = {
  subAdmins: [],
  loading: false,
  error: null,
};

const mutations = {
  SET_SUB_ADMINS(state, list) {
    state.subAdmins = list;
  },
  ADD_SUB_ADMIN(state, subAdmin) {
    state.subAdmins.unshift(subAdmin);
  },
  REMOVE_SUB_ADMIN(state, id) {
    state.subAdmins = state.subAdmins.filter((s) => s._id !== id);
  },
  SET_LOADING(state, val) {
    state.loading = val;
  },
  SET_ERROR(state, msg) {
    state.error = msg;
  },
};

const actions = {
  async fetchSubAdmins({ commit }) {
    commit("SET_LOADING", true);
    try {
      const res = await getSubAdminsApi();
      commit("SET_SUB_ADMINS", res.data.data);
    } catch (err) {
      commit("SET_ERROR", err.response?.data?.message || err.message);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async addSubAdmin({ commit }, payload) {
    const res = await addSubAdminApi(payload);
    commit("ADD_SUB_ADMIN", res.data.data);
    return res.data.data;
  },

  async removeSubAdmin({ commit }, id) {
    await removeSubAdminApi(id);
    commit("REMOVE_SUB_ADMIN", id);
  },
};

const getters = {
  subAdmins: (state) => state.subAdmins,
  subAdminCount: (state) => state.subAdmins.length,
  subAdminLoading: (state) => state.loading,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
