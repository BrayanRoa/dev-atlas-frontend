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

export interface IWorkspaceCreateResponse {
  message: string;
  data: IWorkspace;
}

export interface IWorkspaceListResponse {
  message: string;
  data: IWorkspace[];
}
