import { IBaseResponse } from '../../../shared/interfaces/base.response';
import { ITag } from '../../tags/interfaces/tag.interface';

export interface IWorkspace {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  deletedAt?: Date | null;
  tags?: ITag[];
}

export interface IWorkspaceCreateRequest {
  name: string;
}

export interface IWorkspaceCreateResponse extends IBaseResponse<IWorkspace> {}

export interface IWorkspaceListResponse extends IBaseResponse<IWorkspace[]> {}
