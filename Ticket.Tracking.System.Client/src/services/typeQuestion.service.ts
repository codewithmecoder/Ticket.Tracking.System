import { BaseResponse } from '../models/baseResponse.model';
import { MessageResponseModel } from '../models/messageResponse.model';
import {
  TypeQuestionModel,
  TypeQuestionUpdateModel,
} from '../models/typeQuestion.model';
import { axiosInstance } from '../utils/axiosBase';
import fetcher from '../utils/fetcher';

export const createTypeQuestion = (typeQuestion: void) => {
  return axiosInstance.post('/api/v1/typeQuestion', typeQuestion);
};

export const fetchTypeQuestions = () => {
  return fetcher<BaseResponse<TypeQuestionModel[] | MessageResponseModel>>(
    '/api/v1/typeQuestion'
  );
};

export const fetchOnlyTypeQuestions = () => {
  return fetcher<BaseResponse<TypeQuestionModel[] | MessageResponseModel>>(
    '/api/v1/typeQuestion/onlyTypeQuestion'
  );
};

export const updateTypeQuestion = (
  typeQuestionUpdate: TypeQuestionUpdateModel
) => {
  return axiosInstance.put(`/api/v1/typeQuestion/${typeQuestionUpdate.id}`, {
    type: typeQuestionUpdate.type,
    photo: typeQuestionUpdate.photo,
  });
};

export const deleteTypeQuestion = (id: number) => {
  return axiosInstance.delete(`/api/v1/typeQuestion/${id}`);
};
