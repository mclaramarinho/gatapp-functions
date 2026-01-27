import { ICustomException } from "../ICustomException";

/**
 * Exceptions thrown when pet is not found in database
 */
export class PedigreeNotFound extends Error implements ICustomException {
  statusCode: number;

  /**
   */
  constructor() {
    super("Pedigree does not exist.");
    this.statusCode = 404;
    this.name = "PedigreeNotFound";
  }
}
