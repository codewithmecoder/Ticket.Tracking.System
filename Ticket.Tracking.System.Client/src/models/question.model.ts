import { AnswerQuestionModel } from './answerQuestion.model';
import { TypeQuestionModel } from './typeQuestion.model';

export type QuestionModel = {
  id: number;
  content: string;
  answerQuestions: AnswerQuestionModel[];
  typeQuestion: TypeQuestionModel;
  createdAt?: Date;
  updatedAt?: Date;
  typeQuestionId: number;
};

export type CreateQuestionModel = {
  content: string | null;
  typeQuestionId: number;
  updatedAt?: Date;
};
