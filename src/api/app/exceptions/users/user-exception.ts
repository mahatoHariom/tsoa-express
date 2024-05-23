import { NotFoundException } from "../../../../shared/common/exceptions/not-found-exception";


export class NotFoundUserException extends NotFoundException {
  constructor() {
    super('This email is not registered.');
  }
}
