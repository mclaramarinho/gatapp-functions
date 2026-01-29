import { ICustomException } from "../ICustomException";

/**
 * Exceptions thrown when pet is not found in database
 */
export class ScheduleNotFound extends Error
  implements ICustomException {
  statusCode: number;

  /**
   */
  constructor() {
    super("Schedule does not exist.");
    this.statusCode = 404;
    this.name = "ScheduleNotFound";
  }
}
