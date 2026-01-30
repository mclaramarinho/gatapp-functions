import { ScheduleReminderModel }
  from "../../features/scheduleReminders/models/ScheduleReminderModel";
import { ScheduleTypeData } from "../enums/scheduleType";
import { NotImplementedException } from "../exceptions/NotImplementedException";
import { ScheduleReminderNotFound }
  from "../exceptions/scheduleReminders/ScheduleReminderNotFound";
import { ScheduleNotFound }
  from "../exceptions/schedules/ScheduleNotFound";
import { FirestoreCollections } from "../firestore/collections";
import { firestore } from "../firestore/init";
import { PetValidations } from "./PetValidations";

/**
 * Shared validations for schedule reminders
 */
export class ScheduleReminderValidations {
  /**
   * @param {string} reminderId
   * @param {string} userId
   * @param {number} scheduleType
   *
   * @return {ScheduleReminderModel}
   *
   * @throws {ScheduleNotFound}
   * @throws {ScheduleReminderNotFound}
   */
  static async existsAndBelongsToUser(
      reminderId: string,
      userId: string,
      scheduleType: ScheduleTypeData
  ) : Promise<ScheduleReminderModel> {
    // Validate reminder exists
    const result = await firestore
        .collection(FirestoreCollections.ScheduleReminders)
        .doc(reminderId)
        .get();
    if (!result.exists) throw new ScheduleReminderNotFound();

    // Validate schedule exists
    if (!scheduleType.collection) throw new NotImplementedException();
    const reminder = result.data();
    if (!reminder) throw new ScheduleReminderNotFound();
    const scheduleId = reminder.scheduleId;
    const schedule = await firestore
        .collection(scheduleType.collection)
        .doc(scheduleId)
        .get();
    if (!schedule.exists) throw new ScheduleNotFound();
    const petId = schedule.data()?.petId;
    await PetValidations.existsAndBelongsToUser(petId, userId);

    return new ScheduleReminderModel(
        result.id,
        reminder.scheduleId,
        reminder.remindTime,
        reminder.periodTypeId
    );
  }
}
