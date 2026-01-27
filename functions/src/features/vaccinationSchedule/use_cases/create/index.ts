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
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";

export const createScheduleReminder = onRequest(async (req, res) => {
  try {
    const uid = await validateAuthToken(getAuthTokenFromRequest(req));

    const model = new CreateVaccinationScheduleModel(req.body);

    await PetValidations.existsAndBelongsToUser(model.petId, uid);

    await VaccineValidations.exists(model.vaccineId);

    const docRef = await firestore
        .collection(FirestoreCollections.VaccinationSchedules)
        .add({
          ...model,
        });
    res.status(201).send({
      docRef,
    });
    return;
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).send({ error: message });
    return;
  }
});
