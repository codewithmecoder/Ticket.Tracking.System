import { QuestionModel } from './question.model';

export type TypeQuestionModel = {
  id: number;
  type: string;
  photo: null | string;
  questions: QuestionModel[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type TypeQuestionUpdateModel = {
  id: number;
  type: string;
  photo: null | string;
};
