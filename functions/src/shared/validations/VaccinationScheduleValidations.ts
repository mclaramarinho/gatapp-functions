import { VaccinationScheduleModel }
  from "../../features/vaccinationSchedule/models/VaccinationScheduleModel";
import { ScheduleNotFound }
  from "../exceptions/schedules/ScheduleNotFound";
import { FirestoreCollections } from "../firestore/collections";
import { firestore } from "../firestore/init";
import { PetValidations } from "./PetValidations";

/**
 * Shared validations for vaccination schedules
 */
export class VaccinationScheduleValidations {
  /**
   * @param {string} schedId
   * @param {string} userId
   *
   * @return {VaccinationScheduleModel}
   *
   * @throws {ScheduleNotFound} if schedule does not exist
   * on database or if it does not belong to the user requesting
   */
  static async existsAndBelongsToUser(schedId: string, userId: string)
    : Promise<VaccinationScheduleModel> {
    // get schedule
    const schedDoc = await firestore
        .collection(FirestoreCollections.VaccinationSchedules)
        .where("id", "==", schedId)
        .get();
    if (schedDoc.empty) throw new ScheduleNotFound();
    const scheduleData = schedDoc.docs[0].data();

    // get schedule's pet id
    const petId = scheduleData.petId;

    // validate if pet belongs to user
    try {
      await PetValidations.existsAndBelongsToUser(petId, userId);
      return new VaccinationScheduleModel({
        vaccineScheduleId: schedDoc.docs[0].id,
        isRecurring: scheduleData.isRecurring,
        petId: scheduleData.petId,
        sendReminders: scheduleData.sendReminders,
        vaccineId: scheduleData.vaccineId,
      });
    } catch (error) {
      throw new ScheduleNotFound();
    }
  }
}
