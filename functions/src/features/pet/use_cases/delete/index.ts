import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { onRequest } from "firebase-functions/v2/https";
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";
import { MissingQueryParam }
  from "../../../../shared/exceptions/MissingQueryParam";
import { PetDoesNotExist }
  from "../../../../shared/exceptions/pets/PetDoesNotExist";
import { PetDoesNotBelongToUser }
  from "../../../../shared/exceptions/pets/PetDoesNotBelongToUser";

export const deletePet = onRequest(async (req, res) => {
  try {
    const petId = req.query.petId as string;
    if (!petId) throw new MissingQueryParam("petId");

    const ownerIdFromToken = await validateAuthToken(
        getAuthTokenFromRequest(req)
    );

    const petDocRef = firestore
        .collection(FirestoreCollections.Pets).doc(petId);
    const petDoc = await petDocRef.get();
    if (!petDoc.exists) throw new PetDoesNotExist();

    const petData = petDoc.data();
    if (petData?.ownerId !== ownerIdFromToken) {
      throw new PetDoesNotBelongToUser();
    }

    await petDocRef.delete();

    res.status(204).json({ message: "Pet deleted successfully" });
    return;
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).json({ message: message });
    return;
  }
});
