import { onRequest } from "firebase-functions/v2/https";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";

/**
 * HTTP function to get all period types from Firestore.
 */
export const getPeriodTypes = onRequest(async (req, res) => {
  try {
    const data = await firestore
        .collection(FirestoreCollections.PeriodTypes)
        .get();
    const periodTypes = data.docs.map((doc) => doc.data());
    res.status(200).send({ periodTypes });
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).send({ error: message });
  }
});
