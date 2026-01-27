/**
 * Model representing a vaccination schedule for a pet.
 */
export class CreateVaccinationScheduleModel {
  vaccineId: number;
  petId: string;
  sendReminders: boolean;
  isRecurring: boolean;

  /**
   * @param {number} vaccineId
   * @param {string} petId
   * @param {boolean} sendReminders
   * @param {boolean} isRecurring
   */
  constructor(
      { vaccineId, petId, sendReminders, isRecurring }:
      {
        vaccineId: number,
        petId: string,
        sendReminders: boolean,
        isRecurring: boolean
      }
  ) {
    this.vaccineId = vaccineId;
    this.petId = petId;
    this.sendReminders = sendReminders;
    this.isRecurring = isRecurring;
  }
}
