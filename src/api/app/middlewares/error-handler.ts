
import { ErrorRequestHandler, NextFunction } from 'express';
import { ValidateError } from 'tsoa';
import { Prisma } from '@prisma/client';
import { Exception } from '../../../shared/common/exceptions/Exception';
import { ErrorResponsePayload } from '../../../shared/common/responses/error-response-payload';

export const errorHandler: ErrorRequestHandler = (err: Error | Exception, req, res, next: NextFunction) => { 

  let statusCode = 500;
  let response = new ErrorResponsePayload(err);
   if (err instanceof Exception) {
    console.log(1);
    statusCode = err.getter().statusCode;
  } else if (err instanceof ValidateError) {
    console.log(2)
    statusCode = err.status;
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    console.log(3);
    statusCode = 400;
    response = new ErrorResponsePayload(new Error('Prisma Validation Error'));
  }
  res.status(statusCode).send(response);
};
