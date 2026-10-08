import { useMutation, useQuery } from "@tanstack/react-query";
import {
  userGetMe,
  userLogin,
  userLogout,
  userRegister,
  userVerifyEmail,
} from "@/api";
import type { IUserRole } from "@/types";

export function useUserLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useUserLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

export function useUserGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: userGetMe,
    retry: false,
  });
}

export function useUserRegistration() {
  return useMutation({
    mutationFn: userRegister,
  });
}

export function useUserVerifyEmail() {
  return useMutation({
    mutationFn: userVerifyEmail,
  });
}

/** Convenience selector over `GET /auth/get-me`. */
export function useAuth() {
  const { data, isPending, isError } = useUserGetMe();
  const user = data?.data;
  const role: IUserRole | null = user?.role ?? null;

  return {
    user,
    role,
    isAuthenticated: !!user,
    isPending,
    isError,
  };
}
