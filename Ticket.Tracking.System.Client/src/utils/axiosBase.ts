import axios from 'axios';
import { ENV } from './env';

export const axiosInstance = axios.create({
  baseURL: ENV.NEXT_PUBLIC_SERVER_URI,
});
axiosInstance.defaults.withCredentials = true;
