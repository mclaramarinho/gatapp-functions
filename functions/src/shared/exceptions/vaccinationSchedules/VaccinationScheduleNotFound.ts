import { ICustomException } from "../ICustomException";

/**
 * Exceptions thrown when pet is not found in database
 */
export class VaccinationScheduleNotFound extends Error
  implements ICustomException {
  statusCode: number;

  /**
   */
  constructor() {
    super("Vaccination Schedule does not exist.");
    this.statusCode = 404;
    this.name = "VaccinationScheduleNotFound";
  }
}
