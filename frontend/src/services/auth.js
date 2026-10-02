import api from './api';
import { jwtDecode } from 'jwt-decode';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  const data = response.data;
  localStorage.setItem('token', data.token);
  localStorage.setItem('role', data.role);
  localStorage.setItem('username', data.username);
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
};

export const getRole = () => localStorage.getItem('role');
export const isAuthenticated = () => !!localStorage.getItem('token');
export const getUsername = () => localStorage.getItem('username');
