import api from "./api";

const packageService = {
  getAll: (params) =>
    api.get("/packages", { params }),

  getById: (id) =>
    api.get(`/packages/${id}`),

  getFeatured: () =>
    api.get("/packages/featured"),

  create: (data) =>
    api.post("/admin/packages", data),

  update: (id, data) =>
    api.put(`/admin/packages/${id}`, data),

  delete: (id) =>
    api.delete(`/admin/packages/${id}`),
};

export default packageService;