export interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: IMeta;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
