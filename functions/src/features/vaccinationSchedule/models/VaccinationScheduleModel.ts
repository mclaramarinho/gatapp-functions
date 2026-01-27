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
   * @param {Map<String, any>} body
   */
  constructor(
      { vaccineScheduleId, vaccineId, petId, sendReminders, isRecurring }:
      {
        vaccineScheduleId: string,
        vaccineId: number,
        petId: string,
        sendReminders: boolean,
        isRecurring: boolean
      }
  ) {
    this.vaccineScheduleId = vaccineScheduleId;
    this.vaccineId = vaccineId;
    this.petId = petId;
    this.sendReminders = sendReminders;
    this.isRecurring = isRecurring;
  }
}
