import { ICustomException } from "../ICustomException";

/**
 * Exceptions thrown when pet is not found in database
 */
export class VaccineNotFound extends Error implements ICustomException {
  statusCode: number;

  /**
   */
  constructor() {
    super("Vaccine does not exist.");
    this.statusCode = 404;
    this.name = "VaccineNotFound";
  }
}
