/**
 * Model representing a schedule reminder.
 */
export class ScheduleReminderModel {
  reminderId: string;
  scheduleId: string;
  remindTime: number;
  periodTypeId: number;

  /**
   * @param {string} reminderId
   * @param {string} scheduleId
   * @param {number} remindTime
   * @param {number} periodTypeId
   */
  constructor(
      reminderId: string,
      scheduleId: string,
      remindTime: number,
      periodTypeId: number
  ) {
    this.reminderId = reminderId;
    this.scheduleId = scheduleId;
    this.remindTime = remindTime;
    this.periodTypeId = periodTypeId;
  }
}
