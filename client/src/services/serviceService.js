import api from "./api";

const serviceService = {
  getAll: (params) =>
    api.get("/services", { params }),

  getById: (id) =>
    api.get(`/services/${id}`),

  getFeatured: () =>
    api.get("/services/featured"),

  create: (data) =>
    api.post("/admin/services", data),

  update: (id, data) =>
    api.put(`/admin/services/${id}`, data),

  delete: (id) =>
    api.delete(`/admin/services/${id}`),
};

export default serviceService;