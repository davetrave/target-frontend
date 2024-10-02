import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VITE_API_URL = 'https://davemwh.pythonanywhere.com/';
//const VITE_API_URL = 'http://localhost:8000/';

// Create an instance of axios
const api = axios.create({
  baseURL: VITE_API_URL,
});

// Intercept requests to add Authorization header
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Intercept responses to handle 401 errors
api.interceptors.response.use(
  response => response,
  async error => {
    //const navigate = useNavigate();

    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem('refresh');
        if (refreshToken) {
          const response = await api.post('api/user/token/refresh/', { refresh: refreshToken });
          if (response.status === 200) {
            localStorage.setItem('access', response.data.access);
            error.config.headers.Authorization = `Bearer ${response.data.access}`;
            return axios(error.config); // Retry the original request
          }
        }
      } catch (refreshError) {
        // Redirect to login if refresh fails
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        //navigate('/login'); // Use navigate to redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default api;
