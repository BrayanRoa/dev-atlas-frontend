import { IBaseResponse } from "../../../shared/interfaces/base.response";





export interface ILoginPayload {
  email: string;
  password: string;
}

// Login Success Response
export interface ILoginSuccessResponse extends IBaseResponse<IUser> {
  access_token: string;
}

// Role Enum
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// User Interface
export interface IUser {
  firstName: string;
  lastName: string | null;
  email: string;
  id: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

// Register Success Response
export interface IRegisterSuccessResponse extends IBaseResponse<IUser> {
  access_token: string;
}

// Register Payload
export interface IRegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
