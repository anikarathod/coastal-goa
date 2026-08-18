import api from "./api";

const contactService = {
  sendMessage: (data) =>
    api.post("/contact", data),

  getAll: (params) =>
    api.get("/admin/contacts", { params }),

  markRead: (id) =>
    api.put(`/admin/contacts/${id}`, {
      isRead: true,
    }),

  markUnread: (id) =>
    api.put(`/admin/contacts/${id}`, {
      isRead: false,
    }),

  delete: (id) =>
    api.delete(`/admin/contacts/${id}`),
};

export default contactService;