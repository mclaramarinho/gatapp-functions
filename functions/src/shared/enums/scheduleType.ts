import { FirestoreCollections } from "../firestore/collections";

/**
 * ScheduleTypeData
 */
export class ScheduleTypeData {
  id: number;
  collection: string | undefined;

  /**
   * @param {number} id
   * @param {string | undefined} collection
   */
  constructor(id: number, collection: string | undefined) {
    this.id = id;
    this.collection = collection;
  }
}

/**
 * Schedule type enum
 */
export class ScheduleType {
  static VACCINATION = new ScheduleTypeData(
      1, FirestoreCollections.VaccinationSchedules
  );
  static MEDICATION = new ScheduleTypeData(2, undefined);

  static validValues = ["1", "2"];

  /**
   * @param {number} id
   *
   * @return {ScheduleTypeData}
   */
  static fromId(id: number): ScheduleTypeData {
    switch (id) {
      case 1:
        return ScheduleType.VACCINATION;
      case 2:
        return ScheduleType.MEDICATION;
      default:
        throw new Error("Invalid Schedule Type id");
    }
  }
}
