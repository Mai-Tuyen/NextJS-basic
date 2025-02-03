import { CredentialsSignin } from "next-auth";
import { EntityError, HttpError } from "../global/type";

export type LoginRequest = {
  username: string;
  password: string;
  expiresInMins: number;
};

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
  expiresInMins: number;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export class CustomLoginError extends CredentialsSignin {
  code: string;
  constructor(customError: Error) {
  super();
    this.code = JSON.stringify(customError);
  }
}

export class CustomLoginEntityError extends CredentialsSignin {
  code: string;
  constructor(customError: EntityError) {
  super();
    this.code = JSON.stringify(customError);
  }
}
