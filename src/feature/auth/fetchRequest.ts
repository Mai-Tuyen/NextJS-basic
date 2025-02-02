import fetchBase from "@/libs/fetchBase";
import { LoginRequest, LoginResponse, RefreshTokenRequest } from "./type";
const authFetchRequest = {
  login: (body: LoginRequest) =>
    fetchBase.post<LoginResponse>("https://dummyjson.com/auth/login", body),
  getCurrentUser: () => fetchBase.get<any>("https://dummyjson.com/auth/me"),
  refreshToken: (body: RefreshTokenRequest) =>
    fetchBase.post("https://dummyjson.com/auth/refresh", body),
};

export default authFetchRequest;
