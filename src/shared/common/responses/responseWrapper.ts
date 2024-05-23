import { plainToClass } from "class-transformer";

export function sendResponse<T>(data: any, classType: new () => T): T {

  return plainToClass(classType, data, { excludeExtraneousValues: true });
}
