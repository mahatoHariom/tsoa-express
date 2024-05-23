import jwt from 'jsonwebtoken';
import express from 'express';
import { UnAuthorizedException } from '../../../shared/common/exceptions/unauthorized-exception';

export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
  if (securityName === 'jwt') {
    const token = request.headers.authorization?.replace('Bearer ', '') as string;
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new UnAuthorizedException());
        return;
      }
      jwt.verify(token, process.env.JWT_SECRET_KEY as string, function (err: any, decoded: any) {
        if (err) {
          reject(err);
        } else {
          if (scopes) {
            for (let scope of scopes) {
              if (!decoded.scopes || !decoded.scopes.includes(scope)) {
                reject(new UnAuthorizedException('user should be admin'));
                return;
              }
            }
          }
          resolve(decoded);
        }
      });
    });
  } else {
    throw new UnAuthorizedException();
  }
}
