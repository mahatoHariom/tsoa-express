export interface iGenericErrorMessage {
  path: string | number;
  message: string;
}

export interface iGenericErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: iGenericErrorMessage[];
}
