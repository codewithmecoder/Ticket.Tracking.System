import { axiosInstance } from '../utils/axiosBase';
import { getItem } from '../utils/tokenStorage';

export const createNewBug = (newTicket: void) => {
  return axiosInstance.post('/api/ticket/', newTicket, {
    headers: { Authorization: `bearer ${getItem('jwtToken')}` },
  });
};

export const createNewFeatureRequest = (newTicket: void) => {
  return axiosInstance.post(
    '/api/ticket/CreateTicketTypeFeatureRequest',
    newTicket,
    {
      headers: { Authorization: `bearer ${getItem('jwtToken')}` },
    }
  );
};

export const createNewTestCase = (newTicket: void) => {
  return axiosInstance.post('/api/ticket/CreateTicketTypeTestCase', newTicket, {
    headers: { Authorization: `bearer ${getItem('jwtToken')}` },
  });
};

export const getTicket = () => {
  return axiosInstance.get('/api/ticket/', {
    headers: { Authorization: `bearer ${getItem('jwtToken')}` },
  });
};
