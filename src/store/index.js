import { createStore } from "vuex";
import auth from "./modules/auth";
import ticket from "./modules/ticket";
import categories from "./modules/categories";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    ticket,
    categories,
  },
});
