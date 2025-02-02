import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginRequest, RefreshTokenRequest } from "./type";
import authFetchRequest from "./fetchRequest";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (body: LoginRequest) => authFetchRequest.login(body),
  });
};

export const useRefreshTokenMutation = () => {
  return useMutation({
    mutationFn: (body: RefreshTokenRequest) =>
      authFetchRequest.refreshToken(body),
  });
};

export const useGetCurrentUserQuery = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: authFetchRequest.getCurrentUser,
  });
};
