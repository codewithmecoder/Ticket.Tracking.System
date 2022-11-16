export type AnswerQuestionModel = {
  id: number;
  answer: string;
  iscorrect: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  questionId: number;
  typeQuestionId: number;
};

export type ErrorAnswerModel = {
  answer: string | null;
  question: string | null;
  typeQuestion: string | null;
};
