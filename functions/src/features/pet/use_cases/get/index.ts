import { onRequest } from "firebase-functions/v2/https";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { firestore } from "../../../../shared/firestore/init";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";
import { MissingQueryParam }
  from "../../../../shared/exceptions/MissingQueryParam";
import { PetDoesNotExist }
  from "../../../../shared/exceptions/pets/PetDoesNotExist";
import { PetDoesNotBelongToUser }
  from "../../../../shared/exceptions/pets/PetDoesNotBelongToUser";

export const getPet = onRequest(async (req, res) => {
  try {
    const petId = req.query.petId as string;
    if (!petId) throw new MissingQueryParam("petId");

    const ownerIdFromToken = await validateAuthToken(
        getAuthTokenFromRequest(req)
    );

    const petDoc = await firestore
        .collection(FirestoreCollections.Pets).doc(petId).get();
    if (!petDoc.exists) throw new PetDoesNotExist();

    const petData = petDoc.data();
    if (petData?.ownerId !== ownerIdFromToken) {
      throw new PetDoesNotBelongToUser();
    }

    res.status(200).json(petData);
    return;
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).json({ message: message });
    return;
  }
});

export const getPetsByOwner = onRequest(async (req, res) => {
  try {
    const ownerIdFromToken = await validateAuthToken(
        getAuthTokenFromRequest(req)
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
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).json({ message: message });
    return;
  }
});
