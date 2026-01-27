/**
 * Model representing a schedule reminder.
 */
export class CreateScheduleReminderModel {
  scheduleId: string;
  remindTime: number;
  periodTypeId: number;

  /**
   * @param {Map<String, any>} data
   */
  constructor(
      { scheduleId, remindTime, periodTypeId }:
      { scheduleId: string; remindTime: number; periodTypeId: number }
  ) {
    this.scheduleId = scheduleId;
    this.remindTime = remindTime;
    this.periodTypeId = periodTypeId;
  }
}
