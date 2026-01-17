import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { WritePetModel } from "../../models/WritePetModel";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { onRequest } from "firebase-functions/v2/https";

export const updatePet = onRequest(async (req, res) => {
  try {
    const petId = req.query.petId;
    if (!petId) {
      res.status(400).send({ error: "petId is required" });
      return;
    }

    const oauthToken = req.headers.authorization?.split("Bearer ")[1];
    const ownerId = await validateAuthToken(oauthToken);

    // validate that pet exists and belongs to ownerId
    const petDoc = await firestore
        .collection(FirestoreCollections.Pets).doc(petId as string).get();
    if (!petDoc.exists) {
      res.status(404).send({ error: "Pet not found" });
      return;
    } else if (petDoc.data()?.ownerId !== ownerId) {
      res.status(403)
          .send({ error: "You do not have permission to update this pet" });
      return;
    }

    const model = new WritePetModel(new Map(Object.entries(req.body)));
    await firestore.collection(FirestoreCollections.Pets)
        .doc(petId as string)
        .update({
          ...model,
        });
    res.status(200).send({ message: "Pet updated successfully" });
    return;
  } catch (error) {
    const errorHandled = ExceptionsHandler.handle(error as Error);
    res.status(errorHandled.statusCode).json({ message: errorHandled.message });
    return;
  }
});
