import api from './axios';
import type { User } from '../types';

interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export const authApi = {
  register: async (data: { name: string; email: string; password: string }): Promise<User> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    // Store token in localStorage
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  },

  login: async (data: { email: string; password: string }): Promise<User> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    // Store token in localStorage
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    // Remove token from localStorage
    localStorage.removeItem('token');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
};