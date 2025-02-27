import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants/constant';

const API = axios.create({
  baseURL: API_URL,
});

let isRefreshing = false;
let refreshSubscribers = [];

API.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = await AsyncStorage.getItem('authToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          const accessToken = await AsyncStorage.getItem('authToken');
          const refresh = {"refresh": refreshToken};
          // Send a request to your server to refresh the access token using the refreshToken.
          // Replace 'refreshTokenEndpoint' with your actual refresh token endpoint.
          const response = await axios.post(`${API_URL}/token/refresh/`, refresh);

          const newAccessToken = response.data.access;
          await AsyncStorage.setItem('authToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          refreshSubscribers.forEach((callback) => callback(newAccessToken));
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          // Handle refresh token failure, e.g., logout the user.
          await AsyncStorage.removeItem("authToken");
        } finally {
          isRefreshing = false;
          refreshSubscribers = [];
        }
      } else {
        // Token refresh is in progress, add this request to the subscribers list.
        return new Promise((resolve) => {
          refreshSubscribers.push((accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            resolve(axios(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);

export default API;
