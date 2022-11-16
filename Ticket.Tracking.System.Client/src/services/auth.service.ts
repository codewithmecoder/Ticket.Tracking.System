import { axiosInstance } from '../utils/axiosBase';
import { getItem } from '../utils/tokenStorage';

export const registerUser = (newUser: void) => {
  return axiosInstance.post('/api/auth/register', newUser);
};

export const loginUser = (cred: void) => {
  return axiosInstance.post('/api/auth/login', cred);
};

export const getLoginUser = () => {
  return axiosInstance.get('/api/auth/me', {
    headers: { Authorization: `bearer ${getItem('jwtToken')}` },
  });
};

export const logoutUser = () => {
  return axiosInstance.post('/api/auth/logout');
};
