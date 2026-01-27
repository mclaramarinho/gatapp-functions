import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { WritePetModel } from "../../models/WritePetModel";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { onRequest } from "firebase-functions/v2/https";
import { PetDoesNotExist }
  from "../../../../shared/exceptions/pets/PetDoesNotExist";
import { PetDoesNotBelongToUser }
  from "../../../../shared/exceptions/pets/PetDoesNotBelongToUser";
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";
import { MissingQueryParam }
  from "../../../../shared/exceptions/MissingQueryParam";

export const updatePet = onRequest(async (req, res) => {
  try {
    const petId = req.query.petId;
    if (!petId) throw new MissingQueryParam("petId");

    const ownerId = await validateAuthToken(getAuthTokenFromRequest(req));

    // validate that pet exists and belongs to ownerId
    const petDoc = await firestore
        .collection(FirestoreCollections.Pets).doc(petId as string).get();
    if (!petDoc.exists) {
      throw new PetDoesNotExist();
    } else if (petDoc.data()?.ownerId !== ownerId) {
      throw new PetDoesNotBelongToUser();
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
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).json({ message: message });
    return;
  }
});
