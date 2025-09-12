import API from "./authApi";

export const getSummary = () => API.get("/dashboard/summary");
