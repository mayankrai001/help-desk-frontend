import { getCategoriesApi } from "@/api/modules/categories";

const state = {
  categories: [],
};

const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
};

const actions = {
  async fetchCategories({ commit }) {
    const res = await getCategoriesApi();

    commit("SET_CATEGORIES", res.data.data);
  },
};

const getters = {
  categories: (state) => state.categories,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
