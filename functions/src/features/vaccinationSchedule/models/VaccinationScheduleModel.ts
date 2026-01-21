/**
 * Model representing a vaccination schedule for a pet.
 */
export class VaccinationScheduleModel {
  vaccineScheduleId: string;
  vaccineId: number;
  petId: string;
  sendReminders: boolean;
  isRecurring: boolean;

  /**
   * @param {string} vaccineScheduleId
   * @param {number} vaccineId
   * @param {string} petId
   * @param {boolean} sendReminders
   * @param {boolean} isRecurring
   */
  constructor(
      vaccineScheduleId: string,
      vaccineId: number,
      petId: string,
      sendReminders: boolean,
      isRecurring: boolean
  ) {
    this.vaccineScheduleId = vaccineScheduleId;
    this.vaccineId = vaccineId;
    this.petId = petId;
    this.sendReminders = sendReminders;
    this.isRecurring = isRecurring;
  }
}
