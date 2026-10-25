import { IBaseResponse } from './base.response';

export interface IWorkspace {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  deletedAt?: Date | null;
}

export interface IWorkspaceCreateRequest {
  name: string;
}

export interface IWorkspaceCreateResponse extends IBaseResponse<IWorkspace> {}

export interface IWorkspaceListResponse extends IBaseResponse<IWorkspace[]> {}
