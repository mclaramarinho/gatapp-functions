import { PetDoesNotBelongToUser }
  from "../exceptions/pets/PetDoesNotBelongToUser";
import { PetDoesNotExist } from "../exceptions/pets/PetDoesNotExist";
import { FirestoreCollections } from "../firestore/collections";
import { firestore } from "../firestore/init";

/**
 * Shared validations for pets
 */
export class PetValidations {
  /**
   * Validates if pet exists in database
   * @param {string} petId
   *
   * @throws {PetDoesNotExist}
   */
  static async exists(petId: string) {
    const petDoc = await firestore
        .collection(FirestoreCollections.Pets)
        .where("id", "==", petId)
        .get();
    if (!petDoc || petDoc.size === 0) {
      throw PetDoesNotExist;
    }
  }

  /**
   * Validates if pet exists and belongs to user
   * @param {string} petId
   * @param {string} userId
   *
   * @throws {PetDoesNotExist}
   * @throws {PetDoesNotBelongToUser}
   */
  static async existsAndBelongsToUser(petId: string, userId: string) {
    const petDoc = await firestore
        .collection(FirestoreCollections.Pets)
        .where("id", "==", petId)
        .get();
    if (!petDoc || petDoc.size === 0) {
      throw PetDoesNotExist;
    }
    const petData = petDoc.docs[0].data();
    if (petData.ownerId !== userId) {
      throw PetDoesNotBelongToUser;
    }
  }
}
