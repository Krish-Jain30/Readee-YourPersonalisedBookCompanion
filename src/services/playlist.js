// src/services/playlists.js

import { playlistService } from './api';

// Get all playlists
const getPlaylists = async () => {
  try {
    const response = await playlistService.getPlaylists();
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to get playlists' };
  }
};

// Get a single playlist
const getPlaylist = async (id) => {
  try {
    const response = await playlistService.getPlaylist(id);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to get playlist' };
  }
};

// Create a new playlist
const createPlaylist = async (data) => {
  try {
    const response = await playlistService.createPlaylist(data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to create playlist' };
  }
};

// Add book to playlist
const addBookToPlaylist = async (playlistId, bookData) => {
  try {
    const response = await playlistService.addBookToPlaylist(playlistId, bookData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to add book to playlist' };
  }
};

// Remove book from playlist
const removeBookFromPlaylist = async (playlistId, bookId) => {
  try {
    const response = await playlistService.removeBookFromPlaylist(playlistId, bookId);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to remove book from playlist' };
  }
};

export default {
  getPlaylists,
  getPlaylist,
  createPlaylist,
  addBookToPlaylist,
  removeBookFromPlaylist
};