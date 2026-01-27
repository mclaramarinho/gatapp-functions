import { onRequest } from "firebase-functions/v2/https";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { CreateVaccinationScheduleModel }
  from "./models/CreateVaccinationScheduleModel";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { PetValidations } from "../../../../shared/validations/PetValidations";
import { VaccineValidations }
  from "../../../../shared/validations/VaccineValidations";

export const createScheduleReminder = onRequest(async (req, res) => {
  try {
    const authToken = req.headers.authorization?.split("Bearer ")[1];
    const uid = await validateAuthToken(authToken);

    const body = req.body;
    const model = new CreateVaccinationScheduleModel(body);

    await PetValidations.existsAndBelongsToUser(model.petId, uid);

    await VaccineValidations.exists(model.vaccineId);
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).send({ error: message });
  }
});
