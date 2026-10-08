import type { IApiError } from "@/types";

/** Extracts the backend's `{ message }` from an ofetch API error. */
export function getApiErrorMessage(
  err: unknown,
  fallback = "Something went wrong! Please try again.",
): string {
  if (!err) return fallback;
  const apiError = err as IApiError;
  return (
    apiError.data?.message ||
    apiError.response?.data?.message ||
    (err instanceof Error && err.message) ||
    fallback
  );
}
