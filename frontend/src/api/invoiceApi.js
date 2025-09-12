import API from "./authApi";

export const uploadInvoices = (data) => API.post("/invoices/upload", data);
export const getInvoices = () => API.get("/invoices");
export const approveInvoice = (id, status) =>
  API.put(`/invoices/${id}/approve`, { status });
