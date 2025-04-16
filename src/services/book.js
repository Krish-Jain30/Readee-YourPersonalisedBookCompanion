// src/services/books.js

import { bookService } from './api';

// Search for books
const searchBooks = async (query) => {
  try {
    const response = await bookService.searchBooks(query);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Book search failed' };
  }
};

// Get book details
const getBookDetails = async (bookId) => {
  try {
    const response = await bookService.getBookDetails(bookId);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to get book details' };
  }
};

// Save a book
const saveBook = async (bookId, bookData) => {
  try {
    const response = await bookService.saveBook(bookId, bookData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to save book' };
  }
};

export default {
  searchBooks,
  getBookDetails,
  saveBook
};