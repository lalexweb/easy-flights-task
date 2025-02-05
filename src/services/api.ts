import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: '/',
    'Content-Type': 'application/json; charset=utf-8',
    'x-rapidapi-key': import.meta.env.VITE_API_KEY,
  },
});

export default apiClient;
