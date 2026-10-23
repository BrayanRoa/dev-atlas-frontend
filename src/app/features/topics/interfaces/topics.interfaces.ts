export interface ITopicCreatePayload {
  title: string;
  description: string;
  icon: string;
  content: string;
  parentId: string | null;
  workSpaceId: string;
}

export interface ITopicCreateResponse {
  message: string;
  data: {
    title: string;
    description: string;
    icon: string;
    content: string;
    parentId: string | null;
    workSpaceId: string;
    id: string;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }
}
