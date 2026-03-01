import api from "../axios";

export const createTicketApi = (payload) => {
  console.log("API Payload:", payload); // Debug log to check payload
  return api.post("/tickets", payload);
};

export const getMyTicketsApi = () => {
  return api.get("/tickets/my");
};
