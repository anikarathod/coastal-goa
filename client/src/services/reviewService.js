import api from "./api";

const reviewService = {
  getAll: (params) =>
    api.get("/reviews", { params }),

  getByPackage: (id) =>
    api.get(`/reviews/package/${id}`),

  getByService: (id) =>
    api.get(`/reviews/service/${id}`),

  create: (data) =>
    api.post("/reviews", data),

  approve: (id) =>
    api.put(`/admin/reviews/${id}`, {
      approved: true,
    }),

  hide: (id) =>
    api.put(`/admin/reviews/${id}`, {
      approved: false,
    }),

  delete: (id) =>
    api.delete(`/admin/reviews/${id}`),
};

export default reviewService;