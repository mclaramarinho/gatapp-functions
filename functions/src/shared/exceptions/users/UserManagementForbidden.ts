import { ICustomException } from "../ICustomException";

/**
 * Exceptions thrown when pet is not found in database
 */
export class UserManagementForbidden extends Error implements ICustomException {
  statusCode: number;

  /**
   */
  constructor() {
    super("You cannot manage this user.");
    this.statusCode = 403;
    this.name = "UserManagementForbidden";
  }
}
