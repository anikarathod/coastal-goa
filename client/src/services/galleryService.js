import api from "./api";

const galleryService = {
  getAll: (params) =>
    api.get("/gallery", { params }),

  getFeatured: () =>
    api.get("/gallery/featured"),

  upload: (formData) =>
    api.post("/admin/gallery", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  update: (id, formData) =>
    api.put(`/admin/gallery/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  delete: (id) =>
    api.delete(`/admin/gallery/${id}`),
};

export default galleryService;