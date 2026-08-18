import api from "./api";

const bookingService = {
  create: (data) =>
    api.post("/bookings", data),

  getMyBookings: () =>
    api.get("/bookings/my"),

  getAll: (params) =>
    api.get("/admin/bookings", { params }),

  getById: (id) =>
    api.get(`/admin/bookings/${id}`),

  updateStatus: (id, status) =>
    api.put(`/admin/bookings/${id}/status`, {
      status,
    }),

  delete: (id) =>
    api.delete(`/admin/bookings/${id}`),
};

export default bookingService;