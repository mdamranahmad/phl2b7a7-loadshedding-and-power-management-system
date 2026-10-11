import { userGetMe, userLogin } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useUserLogin() {
    return useMutation({
        mutationFn: userLogin,
    });
}

export function useUserGetMe() {
    return useQuery({
        queryFn: userGetMe,
        queryKey: ["user"],
        retry: 0,
    });
}
