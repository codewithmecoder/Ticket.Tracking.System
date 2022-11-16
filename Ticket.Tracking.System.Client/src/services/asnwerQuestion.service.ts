import { axiosInstance } from '../utils/axiosBase';

export const createAnswer = (newAnswer: void) => {
  return axiosInstance.post(
    '/api/v1/asnwerQuestion/createSingleAnswer',
    newAnswer
  );
};
export const updateAnswer = (answer: void) => {
  return axiosInstance.put('/api/v1/asnwerQuestion/updateSingleAnswer', answer);
};

export const deleteAnswer = (id: void) => {
  return axiosInstance.delete(`/api/v1/asnwerQuestion/${id}`);
};
