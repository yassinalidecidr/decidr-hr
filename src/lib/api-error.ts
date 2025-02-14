export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromError(error: unknown): ApiError {
    if (error instanceof ApiError) {
      return error;
    }

    if (error instanceof Error) {
      return new ApiError(error.message);
    }

    return new ApiError('An unexpected error occurred');
  }
}

export function handleApiError(error: unknown) {
  const apiError = ApiError.fromError(error);
  
  // Log error (you can replace this with your logging service)
  console.error('API Error:', {
    message: apiError.message,
    statusCode: apiError.statusCode,
    code: apiError.code,
  });

  return apiError;
} 