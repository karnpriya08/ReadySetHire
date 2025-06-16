import axios from 'axios';

// Creating base API
const API = axios.create({
  baseURL: ' https://readysethire-roqk.onrender.com/api',
});

//  Add Authorization header to all outgoing requests if token exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // use the key where you store JWT
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
