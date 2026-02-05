/**
 * ScheduleRecurrenceModel
 */
export class ScheduleRecurrenceModel {
  recurrenceId: string;
  scheduleId: string;
  repeatTimes: number;
  repeatPeriodTypeId: number;

  /**
   * @param {Object<string, any>} body
   */
  constructor({
    recurrenceId,
    scheduleId,
    repeatTimes,
    repeatPeriodTypeId,
  }: {
    recurrenceId: string;
    scheduleId: string;
    repeatTimes: number;
    repeatPeriodTypeId: number;
  }) {
    this.recurrenceId = recurrenceId;
    this.scheduleId = scheduleId;
    this.repeatTimes = repeatTimes;
    this.repeatPeriodTypeId = repeatPeriodTypeId;
  }
}
