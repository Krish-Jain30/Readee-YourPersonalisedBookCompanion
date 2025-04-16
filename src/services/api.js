// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgotpassword', { email }),
  resetPassword: (token, password) => api.put(`/auth/resetpassword/${token}`, { password })
};

// Book services
export const bookService = {
  searchBooks: (query) => api.get(`/books/search?q=${query}`),
  getBookDetails: (bookId) => api.get(`/books/${bookId}`),
  getSavedBooks: () => api.get('/books/saved'),
  saveBook: (bookId, bookData) => api.post(`/books/${bookId}/save`, bookData),
  unsaveBook: (bookId) => api.delete(`/books/${bookId}/save`)
};

// Playlist services
export const playlistService = {
  getPlaylists: () => api.get('/playlists'),
  getPlaylist: (id) => api.get(`/playlists/${id}`),
  createPlaylist: (data) => api.post('/playlists', data),
  updatePlaylist: (id, data) => api.put(`/playlists/${id}`, data),
  deletePlaylist: (id) => api.delete(`/playlists/${id}`),
  addBookToPlaylist: (playlistId, bookData) => api.post(`/playlists/${playlistId}/books`, bookData),
  removeBookFromPlaylist: (playlistId, bookId) => api.delete(`/playlists/${playlistId}/books/${bookId}`)
};

export default api;