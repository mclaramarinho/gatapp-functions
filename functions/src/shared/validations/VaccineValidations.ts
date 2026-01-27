import { VaccineNotFound } from "../exceptions/vaccines/VaccineNotFound";
import { FirestoreCollections } from "../firestore/collections";
import { firestore } from "../firestore/init";

/**
 * Shared validations for vaccines
 */
export class VaccineValidations {
  /**
   * @param {string} vaccineId
   */
  static async exists(vaccineId: number) {
    const doc = await firestore
        .collection(FirestoreCollections.Vaccines)
        .where("id", "==", vaccineId)
        .get();

    if (!doc || doc.size === 0) {
      throw VaccineNotFound;
    }
  }
}
