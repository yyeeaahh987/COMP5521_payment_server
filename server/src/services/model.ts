type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
}

function createApiResponse<T>(message: string, data: T): ApiResponse<T> {
  return {
    success: true,
    message,
    data
  };
}

class ApiError implements Error {
  constructor(message: string) {
    this.name = "ApiError";
    this.message = message;
  }
  name: string;
  message: string;
  stack?: string;
}

export { ApiResponse, createApiResponse, ApiError }
