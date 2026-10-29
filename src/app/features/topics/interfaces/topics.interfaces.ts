import { IBaseResponse } from '../../../shared/interfaces/base.response';
import { ITag } from '../../tags/interfaces/tag.interface';

export interface ITopicCreatePayload {
  title: string;
  description: string;
  icon: string;
  content: string;
  parentId: string | null;
  workSpaceId: string;
  tags: string[];
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
  topicTags: ITopicTag[];
}

export interface ITopicTag {
  id:string;
  topicId:string;
  tagId:string;
  createdAt:Date;
  updatedAt:Date;
  deletedAt:Date | null;
  tag: ITag;
}

export interface ITopicCreateResponse extends IBaseResponse<ITopic> {}

// listado de topics, es el listado que se muestra en el sidebar
export interface ITopicListItem extends Pick<ITopic, 'id' | 'title'> {}
export interface ITopicListResponse extends IBaseResponse<ITopicListItem[]> {}

// detalle de un topic, es el detalle que se muestra en la página de detalle de un topic
export interface ITopicDetailResponse extends IBaseResponse<ITopic> {}