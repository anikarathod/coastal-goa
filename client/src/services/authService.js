import api from "./api";

const authService = {
  login: (credentials) =>
    api.post("/auth/login", credentials),

  register: (userData) =>
    api.post("/auth/register", userData),

  getProfile: () =>
    api.get("/auth/me"),

  updateProfile: (data) =>
    api.put("/auth/profile", data),

  changePassword: (data) =>
    api.put("/auth/change-password", data),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export default authService;