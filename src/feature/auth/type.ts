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
