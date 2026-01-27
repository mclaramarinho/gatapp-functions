/**
 * Model representing a vaccination schedule for a pet.
 */
export class UpdateVaccinationScheduleModel {
  scheduleId: string;
  sendReminders: boolean;
  isRecurring: boolean;

  /**
   * @param {Map<String, any>} body
   */
  constructor(
      { scheduleId, sendReminders, isRecurring }:
      {
        scheduleId: string,
        sendReminders: boolean,
        isRecurring: boolean
      }
  ) {
    this.scheduleId = scheduleId;
    this.sendReminders = sendReminders;
    this.isRecurring = isRecurring;
  }
}
