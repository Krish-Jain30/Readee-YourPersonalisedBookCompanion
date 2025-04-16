// src/services/auth.js

import { authService } from './api';

// Set token in localStorage
const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Remove token from localStorage
const removeToken = () => {
  localStorage.removeItem('token');
};

// Check if user is logged in
const isLoggedIn = () => {
  return localStorage.getItem('token') !== null;
};

// Login function
const login = async (email, password) => {
  try {
    const response = await authService.login({ email, password });
    setToken(response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Login failed' };
  }
};

// Register function
const register = async (userData) => {
  try {
    const response = await authService.register(userData);
    setToken(response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Registration failed' };
  }
};

// Logout function
const logout = () => {
  removeToken();
};

// Get current user
const getCurrentUser = async () => {
  try {
    const response = await authService.getCurrentUser();
    return response.data;
  } catch (error) {
    removeToken();
    throw error;
  }
};

export default {
  login,
  register,
  logout,
  getCurrentUser,
  isLoggedIn
};