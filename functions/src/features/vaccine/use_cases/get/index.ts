import { onRequest } from "firebase-functions/v2/https";
import { firestore } from "../../../../shared/firestore/init";
import { VaccineModel } from "../../models/VaccineModel";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { FirestoreCollections } from "../../../../shared/firestore/collections";

/**
 * Get the list of vaccines
 */
export const getVaccinesList = onRequest(async (req, res) => {
  try {
    const docs = await firestore
        .collection(FirestoreCollections.Vaccines).get();
    const vaccines = docs.docs.map((doc) => {
      const data = doc.data();
      return new VaccineModel(
          +(doc.id),
          data.normalizedName,
          data.displayName
      );
    });
    res.status(200).json({ vaccines });
    return;
  } catch (error) {
    const errorHandled = ExceptionsHandler.handle(error as Error);
    res.status(errorHandled.statusCode).json({ message: errorHandled.message });
    return;
  }
});
