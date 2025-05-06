export type ApiError = {
  status: number;
  message: string;
  code?: string;
  data?: any;
};

export class ErrorHandler {
  static handleApiError(error: any): ApiError {
    if (error.response) {
      const { status, data } = error.response;
      
      if (data && data.message) {
        return {
          status,
          message: data.message,
          code: data.code,
          data: data.data
        };
      }
      
      return {
        status,
        message: this.getStatusMessage(status),
        data: data
      };
    } else if (error.request) {
      return {
        status: 0,
        message: 'Server not responding',
        code: 'SERVER_UNREACHABLE'
      };
    } else {
      return {
        status: 500,
        message: error.message || 'Unknown error',
        code: 'UNKNOWN_ERROR'
      };
    }
  }
  
  static getStatusMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Bad request';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not found';
      case 429:
        return 'Too many requests';
      case 500:
        return 'Internal server error';
      case 502:
        return 'Bad gateway';
      case 503:
        return 'Server unavailable';
      default:
        return 'There is an error';
    }
  }
  
}

