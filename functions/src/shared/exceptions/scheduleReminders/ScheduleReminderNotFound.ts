import { ICustomException } from "../ICustomException";

/**
 * Exceptions thrown when pet is not found in database
 */
export class ScheduleReminderNotFound extends Error
  implements ICustomException {
  statusCode: number;

  /**
   */
  constructor() {
    super("Schedule Reminder does not exist.");
    this.statusCode = 404;
    this.name = "ScheduleReminderNotFound";
  }
}
