import { InvalidRequestBodyException }
  from "../exceptions/InvalidRequestBodyException";
import { FirestoreCollections } from "../firestore/collections";
import { firestore } from "../firestore/init";

/**
 * Shared validations for period types
 */
export class PeriodTypeValidations {
  /**
   * @param {number} periodTypeId
   *
   * @throws {InvalidRequestBodyException} if the period type does not exist
   */
  static async exists(periodTypeId: number) {
    const result = await firestore
        .collection(FirestoreCollections.PeriodTypes)
        .doc(periodTypeId.toString())
        .get();
    if (!result.exists) {
      throw new InvalidRequestBodyException("Invalid periodTypeId value.");
    }
  }
}
