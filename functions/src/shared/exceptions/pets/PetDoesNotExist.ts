import { ICustomException } from "../ICustomException";

/**
 * Exceptions thrown when pet is not found in database
 */
export class PetDoesNotExist extends Error implements ICustomException {
  statusCode: number;

  /**
   */
  constructor() {
    super("Pet does not exist");
    this.statusCode = 404;
    this.name = "PetDoesNotExist";
  }
}
