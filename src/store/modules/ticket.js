import { createTicketApi, getMyTicketsApi } from "@/api/modules/ticket";

const state = {
  tickets: [],
};

const mutations = {
  SET_TICKETS(state, tickets) {
    state.tickets = tickets;
  },
};

const actions = {
  async createTicket({ commit }, payload) {
    const res = await createTicketApi(payload);
    commit("SET_TICKETS", res.data.data);
  },

  async fetchMyTickets({ commit }) {
    const res = await getMyTicketsApi();
    commit("SET_TICKETS", res.data.data);
  },
};

const getters = {
  tickets: (state) => state.tickets,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
