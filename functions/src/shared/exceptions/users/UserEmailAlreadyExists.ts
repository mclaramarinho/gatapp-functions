import { ICustomException } from "../ICustomException";

/**
 * Exceptions thrown when pet is not found in database
 */
export class UserEmailAlreadyExists extends Error implements ICustomException {
  statusCode: number;

  /**
   */
  constructor() {
    super("User with the same email already exists");
    this.statusCode = 409;
    this.name = "UserEmailAlreadyExists";
  }
}
