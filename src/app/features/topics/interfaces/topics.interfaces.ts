import { IBaseResponse } from '../../../shared/interfaces/base.response';

export interface ITopicCreatePayload {
  title: string;
  description: string;
  icon: string;
  content: string;
  parentId: string | null;
  workSpaceId: string;
}

export interface ITopic {
  id: string;
  parentId: string | null;
  title: string;
  icon: string;
  content: string;
  description: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  workSpaceId: string;
}

export interface ITopicCreateResponse extends IBaseResponse<ITopic> {}

export interface ITopicListResponse extends IBaseResponse<ITopic[]> {}
