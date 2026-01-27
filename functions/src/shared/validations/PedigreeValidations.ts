import { PedigreeNotFound } from "../exceptions/pedigrees/PedigreeNotFound";
import { FirestoreCollections } from "../firestore/collections";
import { firestore } from "../firestore/init";

/**
 * Shared validations for Pedigree
 */
export class PedigreeValidations {
  /**
   * Validates if pedigree exists in database
   * @param {number} id
   */
  static async exists(id: number) {
    const pedigreeDoc = await firestore
        .collection(FirestoreCollections.CatPedigrees)
        .doc(id.toString()).get();
    if (!pedigreeDoc.exists) throw new PedigreeNotFound();
  }
}
