import { ICustomException } from "../ICustomException";

/**
 * Exceptions thrown when pet is not found in database
 */
export class PetDoesNotBelongToUser extends Error implements ICustomException {
  statusCode: number;

  /**
   */
  constructor() {
    super("You do not have permission to manage this pet.");
    this.statusCode = 403;
    this.name = "PetDoesNotBelongToUser";
  }
}
