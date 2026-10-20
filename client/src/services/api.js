import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

// Strip the trailing /api to get the server origin
// "http://localhost:5000/api" -> "http://localhost:5000"
export const SERVER_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

/**
 * Turn any image value into a fully-qualified URL.
 *  - "https://cdn.com/x.jpg"     -> unchanged
 *  - "data:image/png;base64..."  -> unchanged
 *  - "/uploads/abc.jpg"          -> "http://localhost:5000/uploads/abc.jpg"
 *  - "uploads/abc.jpg"           -> "http://localhost:5000/uploads/abc.jpg"
 *  - null / "" / undefined       -> null
 */
export const resolveImage = (raw) => {
  if (!raw || typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (/^(https?:)?\/\//i.test(trimmed)) return trimmed;   // absolute
  if (trimmed.startsWith("data:")) return trimmed;         // base64
  if (trimmed.startsWith("blob:")) return trimmed;         // object URL
  return `${SERVER_ORIGIN}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`;
};

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;