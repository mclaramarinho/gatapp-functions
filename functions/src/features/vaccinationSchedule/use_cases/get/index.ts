import { onRequest } from "firebase-functions/v2/https";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";
import { MissingQueryParam }
  from "../../../../shared/exceptions/MissingQueryParam";
import { VaccinationScheduleValidations }
  from "../../../../shared/validations/VaccinationScheduleValidations";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { PetValidations } from "../../../../shared/validations/PetValidations";

export const getVaccinationSchedule = onRequest(async (req, res) => {
  try {
    const schedId = req.params.scheduleId as string;
    if (!schedId) throw new MissingQueryParam("scheduleId");

    const uid = await validateAuthToken(getAuthTokenFromRequest(req));

    const sched = await VaccinationScheduleValidations
        .existsAndBelongsToUser(schedId, uid);
    res.status(200).send({ schedule: sched });
    return;
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).send({ error: message });
    return;
  }
});

export const getAllVaccinationSchedules = onRequest(async (req, res) => {
  try {
    const uid = await validateAuthToken(getAuthTokenFromRequest(req));
    const petId = req.params.petId as string;
    if (!petId) throw new MissingQueryParam("petId");
    await PetValidations.existsAndBelongsToUser(petId, uid);

    const docs = await firestore
        .collection(FirestoreCollections.VaccinationSchedules)
        .where("petId", "==", petId)
        .get();

    res.status(200).send({
      schedules: docs.empty ?
        [] :
        docs.forEach((doc) => doc.data()),
    });
    return;
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).send({ error: message });
    return;
  }
});
