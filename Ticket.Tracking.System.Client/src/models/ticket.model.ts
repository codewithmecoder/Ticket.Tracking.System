export type CreateNewBugModel = {
  summary: string;
  description: string;
  severity: boolean;
  priority: number;
};

export type TicketModel = {
  id: number;
  summary: string;
  description: string;
  isSovled: boolean;
  userId: string;
  createdAt?: Date;
  updateAt?: Date;
  severity: boolean;
  priority: number;
  type: string;
};
