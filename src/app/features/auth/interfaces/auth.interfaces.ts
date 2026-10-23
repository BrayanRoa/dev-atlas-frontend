export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginSuccessResponse {
  user: IUser;
  access_token: string;
}
