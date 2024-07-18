// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api', // Replace with your API base URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
  if (token) {
    console.log("Token Fetched")
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
