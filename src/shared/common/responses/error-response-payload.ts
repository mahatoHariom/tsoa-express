import httpStatus from 'http-status';
import { ValidateError } from 'tsoa';
import { Exception } from '../exceptions/Exception';

export class ErrorResponsePayload {
  message: string;
  constructor(err: Error | Exception | ValidateError) {
     if (err instanceof Exception) {
      const { message } = err.getter();
      this.message = message;
    }
    else if (err instanceof ValidateError) {
      this.message = 'The input values are invalid.';
    }
    else {
      this.message = httpStatus[500];
    }
  }
}
