import axios from 'axios';

let accessToken = localStorage.getItem('accessToken'); // keep in memory ideally

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true, // needed for cookies (refreshToken)
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

// Intercept 401 errors and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        const res = await axios.post(
          'http://localhost:4000/api/auth/refresh-token',
          { refreshToken }
        );

        accessToken = res.data.accessToken;
        localStorage.setItem('accessToken', accessToken ?? '');

        // Retry the original request
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        window.location.href = '/login'; // redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
