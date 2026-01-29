import { ICustomException } from "./ICustomException";

/**
 * Custom exception to indicate unauthorized access attempts
 */
export class NotImplementedException extends Error implements ICustomException {
  statusCode: number;

  /**
   */
  constructor() {
    super();
    this.name = "NotImplementedException";
    this.statusCode = 501;
  }
}
