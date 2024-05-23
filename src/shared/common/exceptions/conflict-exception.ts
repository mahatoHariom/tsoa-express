import httpStatus from 'http-status';
import { Exception } from './Exception';

export class ConflictException extends Exception {
  constructor(message?: string) {
    super(message || httpStatus[httpStatus.CONFLICT]);
    this.statusCode = httpStatus.CONFLICT;
  }
}
