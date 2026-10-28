export interface ITagPayload {
  name: string;
  color: string;
  workSpaceId: string;
}

export interface ITag {
  id: string;
  name: string;
  color: string;
  workSpaceId: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface ITagCreateRequest extends ITag {}