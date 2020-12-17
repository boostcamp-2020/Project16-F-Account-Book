import axios from 'axios';
import endpoints from '@/commons/endpoints';

const instance = axios.create({
  baseURL: endpoints.API_BASE_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => Promise.resolve(response.data),
  (error) => Promise.reject(error),
);

export default instance;
