import axios from 'axios';
import endpoints from './endpoints';

const instance = axios.create({
  baseURL: endpoints.API_BASE_URL,
});

instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

export default instance;
