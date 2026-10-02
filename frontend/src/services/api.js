import axios from 'axios';

const api = axios.create({
  // In production: uses VITE_API_BASE_URL from .env.production (e.g. https://zt-vis-backend.onrender.com/api)
  // In dev: uses /api which Vite proxies to localhost:8080
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
