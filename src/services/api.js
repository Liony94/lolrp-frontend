import axios from "axios";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important pour les cookies
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Ajouter le token aux headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  // Pour les requêtes multipart/form-data
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Rediriger vers login si non authentifié
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
