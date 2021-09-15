import { ResponseError } from '../types';

class CustomError extends Error implements ResponseError {
  public name = 'CustomError' as const;

  constructor(
    public statusCode: number,
    public code: string,
    public message: string,
    public details: ResponseError['details'] = [],
  ) {
    super(message);
  }
}

export default CustomError;
