export interface Workspace {
    id: string;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface WorkspaceCreateResponse {
    message: string;
    data: Workspace;
}

export interface WorkspaceListResponse {
    message: string;
    data: Workspace[];
}