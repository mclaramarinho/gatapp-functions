import { onRequest } from "firebase-functions/v2/https";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { WritePetModel } from "../../models/WritePetModel";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { UserValidations }
  from "../../../../shared/validations/UserValidations";
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";
import { PedigreeValidations }
  from "../../../../shared/validations/PedigreeValidations";
import { CatColorValidations }
  from "../../../../shared/validations/CatColorValidations";

export const createPet = onRequest(async (req, res) => {
  try {
    const body = req.body;
    const model = new WritePetModel(new Map(Object.entries(body)));

    // validate ownerId exists in the system
    const ownerId = await validateAuthToken(getAuthTokenFromRequest(req));
    await UserValidations.exists(ownerId);

    // validate pedigree
    await PedigreeValidations.exists(model.pedigree);

    // validate color
    await CatColorValidations.exists(model.color);

    // save pet
    await firestore.collection(FirestoreCollections.Pets).add({
      name: model.name,
      ownerId: ownerId,
      birthdate: Timestamp
          .fromDate(new Date(model.birthdate)),
      pedigree: model.pedigree,
      color: model.color,
      createdAt: FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: "Pet created successfully" });
    return;
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).json({ message: message });
    return;
  }
});
