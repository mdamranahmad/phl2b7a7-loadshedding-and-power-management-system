import { userLogin } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useUserLogin() {
    return useMutation({
        mutationFn: userLogin,
    });
}
