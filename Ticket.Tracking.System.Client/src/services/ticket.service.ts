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

export const updateTicket = (ticket: void) => {
  return axiosInstance.put(`/api/ticket`, ticket, {
    headers: { Authorization: `bearer ${getItem('jwtToken')}` },
  });
};

export const deleteTicket = (id: void) => {
  return axiosInstance.delete(`/api/ticket/${id}`, {
    headers: { Authorization: `bearer ${getItem('jwtToken')}` },
  });
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
