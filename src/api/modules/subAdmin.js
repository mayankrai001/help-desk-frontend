import api from "../axios";

export const getSubAdminsApi = () => api.get("/sub-admins");

export const addSubAdminApi = (payload) => api.post("/sub-admins", payload);

export const removeSubAdminApi = (id) => api.delete(`/sub-admins/${id}`);
