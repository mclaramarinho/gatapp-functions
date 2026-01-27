import { ICustomException } from "./ICustomException";

/**
 * Exception thrown when the request body is invalid
 */
export class InvalidRequestBodyException
  extends Error implements ICustomException {
  statusCode: number;

  /**
   * @param {string} message
   */
  constructor(message: string) {
    super(message);
    this.name = "InvalidRequestBodyException";
    this.statusCode = 422;
  }
}
