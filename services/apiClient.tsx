import axios from 'axios';
import Settings from '../config/settings';
const apiClient = axios.create({
  baseURL: Settings.baseUrl, // your API base URL
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const setAuthToken = token => {
  if (token) {
    // Set token globally for all requests
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Remove token
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

apiClient.interceptors.request.use(request => {
  return request;
});

export {apiClient, setAuthToken};
