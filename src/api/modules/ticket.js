import api from "../axios";

export const createTicketApi = (payload) => {
  return api.post("/tickets", payload);
};

export const getMyTicketsApi = () => {
  return api.get("/tickets/my");
};

export const getAllTicketsApi = () => {
  return api.get("/tickets/admin");
};

export const updateTicketStatusApi = (ticketId, payload) => {
  return api.patch(`/tickets/admin/${ticketId}/status`, payload);
};
