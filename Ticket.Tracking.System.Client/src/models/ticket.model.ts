export type CreateNewBugModel = {
  summary: string;
  description: string;
};

export type TicketModel = {
  id: number;
  summary: string;
  description: string;
  isSovled: boolean;
  userId: string;
  createdAt: Date;
  updateAt: Date;
  severity: boolean;
  priority: number;
  type: string;
};
