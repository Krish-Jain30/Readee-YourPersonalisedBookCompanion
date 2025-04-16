import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllBooks = async () => {
  const res = await axios.get(`${BASE_URL}/books`);
  return res.data;
};

export const addBook = async (bookData, token) => {
  const res = await axios.post(`${BASE_URL}/books`, bookData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
