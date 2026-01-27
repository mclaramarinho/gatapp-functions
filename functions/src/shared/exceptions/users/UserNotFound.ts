import { ICustomException } from "../ICustomException";

/**
 * Exceptions thrown when pet is not found in database
 */
export class UserNotFound extends Error implements ICustomException {
  statusCode: number;

  /**
   */
  constructor() {
    super("User does not exist.");
    this.statusCode = 404;
    this.name = "UserNotFound";
  }
}
