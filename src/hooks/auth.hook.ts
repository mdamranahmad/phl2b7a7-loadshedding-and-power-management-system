import { userGetMe, userLogin, userLogout } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

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
        queryFn: userGetMe,
        queryKey: ["user"],
        retry: false,
    });
}
