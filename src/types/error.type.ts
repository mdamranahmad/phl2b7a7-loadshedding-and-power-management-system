export interface IApiError extends Error {
    data?: {
        message?: string;
        success?: boolean;
    };
    response?: {
        data?: {
            message?: string;
        };
    };
}
