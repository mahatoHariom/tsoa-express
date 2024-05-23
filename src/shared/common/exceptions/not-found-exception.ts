import httpStatus from 'http-status';
import { Exception } from './Exception';

export class NotFoundException extends Exception {
  constructor(message?: string) {
    super();
    this.message = message || (httpStatus[httpStatus.NOT_FOUND] as string);
  }
}
