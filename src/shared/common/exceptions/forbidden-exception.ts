import httpStatus from 'http-status';
import { Exception } from './Exception';


export class ForbiddenException extends Exception {
  constructor(message?: string) {
    super();
    this.message = message || (httpStatus[ httpStatus.FORBIDDEN] as string);
  }
}
