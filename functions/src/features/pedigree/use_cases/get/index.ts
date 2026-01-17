import { onRequest } from "firebase-functions/v2/https";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { firestore } from "../../../../shared/firestore/init";
import { CatPedigreeModel } from "../create/models/CatPedigreeModel";

/**
 * Get the list of cat pedigrees
 */
export const getPedigreesList = onRequest(async (req, res) => {
  try {
    const pedigreesSnapshot = await firestore
        .collection(FirestoreCollections.CatPedigrees)
        .get();
    const pedigrees = pedigreesSnapshot.docs.map((doc) => {
      const data = doc.data();
      return new CatPedigreeModel(
          +(doc.id), data.normalizedName, data.displayName
      );
    });
    res.status(200).json({ pedigrees });
    return;
  } catch (error) {
    const errorHandled = ExceptionsHandler.handle(error as Error);
    res.status(errorHandled.statusCode)
        .json({ message: errorHandled.message });
    return;
  }
});
