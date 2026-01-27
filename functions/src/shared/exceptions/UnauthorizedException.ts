import { ICustomException } from "./ICustomException";

/**
 * Custom exception to indicate unauthorized access attempts
 */
export class UnauthorizedException extends Error implements ICustomException {
  statusCode: number;

  /**
   * @param {string} message
   */
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedException";
    this.statusCode = 401;
  }
}
