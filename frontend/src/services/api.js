import axios from 'axios';

const APP_URL = import.meta.env.VITE_API_BASE_URL; 

const api = axios.create({
  baseURL: APP_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

export default api;
