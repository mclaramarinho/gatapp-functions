import { onRequest } from "firebase-functions/v2/https";
import { UpdateVaccinationScheduleModel }
  from "./models/UpdateVaccinationScheduleModel";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";
import { VaccinationScheduleValidations }
  from "../../../../shared/validations/VaccinationScheduleValidations";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";

export const updateVaccinationSchedule = onRequest(async (req, res) => {
  try {
    const uid = await validateAuthToken(getAuthTokenFromRequest(req));

    const model = new UpdateVaccinationScheduleModel(req.body);
    await VaccinationScheduleValidations
        .existsAndBelongsToUser(model.scheduleId, uid);

    await firestore.collection(FirestoreCollections.VaccinationSchedules)
        .doc(model.scheduleId)
        .update({
          isRecurring: model.isRecurring,
          sendReminders: model.sendReminders,
        });

    res.status(200).send({ message: "Success" });
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).send({ error: message });
  }
});
