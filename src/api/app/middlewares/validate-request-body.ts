import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { BadRequestException } from '../../../shared/common/exceptions/bad-request-exception';

export const validateRequestBody =
  (type: any): RequestHandler =>
  async (req, res, next) => {
    try {
      const instance = plainToClass(type, req.body);
      const errors = await validate(instance, { skipMissingProperties: false });
      if (errors.length > 0) {
        const errorMessage = getMessage(errors[0]);
        const field = errors[0]?.property;
        throw new BadRequestException(`${field} ${errorMessage}`);
      }
      req.body = instance;
      next();
    } catch (err) {
      next(err);
    }
  };

export const getMessage = (error: ValidationError): string => {
  if (!error.constraints) return getMessage(error.children![0]);
  return Object.values(error.constraints!)[0];
};
