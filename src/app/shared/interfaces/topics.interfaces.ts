import { IBaseResponse } from "./base.response";

// Create Topic Payload
export interface ITopicCreatePayload {
  title: string;
  description: string;
  icon: string;
  content: string;
  parentId: string | null;
  workSpaceId: string;
}

// Topic Interface
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


// Create Topic Response
export interface ITopicCreateResponse extends IBaseResponse<ITopic> {}

// List Topics Response
export interface ITopicListResponse extends IBaseResponse<ITopic[]> {}