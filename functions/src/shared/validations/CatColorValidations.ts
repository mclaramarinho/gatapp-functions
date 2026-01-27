import { CatColorNotFound } from "../exceptions/petColors/CatColorNotFound";
import { FirestoreCollections } from "../firestore/collections";
import { firestore } from "../firestore/init";

/**
 * Shared validations for Cat Colors
 */
export class CatColorValidations {
  /**
   * Validates if cat color exists in database
   * @param {number} id
   * @throws {PetColorNotFound}
   */
  static async exists(id: number) {
    const colorDoc = await firestore
        .collection(FirestoreCollections.CatColors)
        .doc(id.toString()).get();
    if (!colorDoc.exists) throw new CatColorNotFound();
  }
}
