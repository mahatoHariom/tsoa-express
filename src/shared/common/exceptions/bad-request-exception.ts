import httpStatus from 'http-status';
import { Exception } from './Exception';

export class BadRequestException extends Exception {
  constructor(message?: string) {
    super();
    this.statusCode = httpStatus.BAD_REQUEST;
    this.message = message || (httpStatus[httpStatus.BAD_REQUEST] as string);
  }
}