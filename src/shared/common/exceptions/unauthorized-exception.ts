import httpStatus from 'http-status';
import { Exception } from './Exception';

export class UnAuthorizedException extends Exception {
  constructor(message?: string) {
    super();
    this.statusCode = httpStatus.UNAUTHORIZED;
    this.message = message || (httpStatus[httpStatus.UNAUTHORIZED] as string);
  }
}
