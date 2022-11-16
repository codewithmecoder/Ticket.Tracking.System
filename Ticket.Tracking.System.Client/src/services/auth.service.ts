import { axiosInstance } from '../utils/axiosBase';

export const registerUser = (newUser: void) => {
  return axiosInstance.post('/api/v1/auth/register', newUser);
};

export const loginUser = (cred: void) => {
  return axiosInstance.post('/api/v1/auth/login', cred);
};

export const logoutUser = () => {
  return axiosInstance.post('/api/v1/auth/logout');
};
