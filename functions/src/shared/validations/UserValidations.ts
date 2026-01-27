import { UserNotFound } from "../exceptions/users/UserNotFound";
import { FirestoreCollections } from "../firestore/collections";
import { firestore } from "../firestore/init";

/**
 * Shared validtions for Users
 */
export class UserValidations {
  /**
   * Checks if user exists in database
   * @param {string} userId
   *
   * @throws {UserNotFound}
   */
  static async exists(userId: string) {
    const doc = firestore
        .collection(FirestoreCollections.Users)
        .doc(userId);
    if (!(await doc.get()).exists) {
      throw UserNotFound;
    }
  }
}
