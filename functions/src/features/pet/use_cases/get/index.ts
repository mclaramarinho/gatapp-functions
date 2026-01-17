import { onRequest } from "firebase-functions/v2/https";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { firestore } from "../../../../shared/firestore/init";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";

export const getPet = onRequest(async (req, res) => {
  try {
    const petId = req.query.petId as string;
    if (!petId) {
      res.status(400).json({ message: "petId query parameter is required" });
      return;
    }

    const oauthToken = req.headers.authorization;
    const ownerIdFromToken = await validateAuthToken(
        oauthToken?.replace("Bearer ", "")
    );

    const petDoc = await firestore
        .collection(FirestoreCollections.Pets).doc(petId).get();
    if (!petDoc.exists) {
      res.status(404).json({ message: "Pet not found" });
      return;
    }

    const petData = petDoc.data();
    if (petData?.ownerId !== ownerIdFromToken) {
      res.status(403)
          .json({ message: "You do not have permission to access this pet" });
      return;
    }

    res.status(200).json(petData);
    return;
  } catch (error) {
    const errorHandled = ExceptionsHandler.handle(error as Error);
    res.status(errorHandled.statusCode).json({ message: errorHandled.message });
    return;
  }
});

export const getPetsByOwner = onRequest(async (req, res) => {
  try {
    const oauthToken = req.headers.authorization;
    const ownerIdFromToken = await validateAuthToken(
        oauthToken?.replace("Bearer ", "")
    );

    const petsSnapshot = await firestore
        .collection(FirestoreCollections.Pets)
        .where("ownerId", "==", ownerIdFromToken)
        .get();

    const pets = petsSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(pets);
    return;
  } catch (error) {
    const errorHandled = ExceptionsHandler.handle(error as Error);
    res.status(errorHandled.statusCode).json({ message: errorHandled.message });
    return;
  }
});
