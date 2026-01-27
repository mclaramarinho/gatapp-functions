import { onRequest } from "firebase-functions/v2/https";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { CreateScheduleReminderModel }
  from "./models/CreateScheduleReminderModel";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { MissingQueryParam }
  from "../../../../shared/exceptions/MissingQueryParam";
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";
import { VaccinationScheduleValidations }
  from "../../../../shared/validations/VaccinationScheduleValidations";

/**
 * HTTP function to create a schedule reminder in Firestore.
 */
export const createScheduleReminder = onRequest(async (req, res) => {
  try {
    const uid = await validateAuthToken(getAuthTokenFromRequest(req));
    const model = new CreateScheduleReminderModel(req.body);

    const scheduleType = req.params.scheduleType as string;
    if (!scheduleType) throw new MissingQueryParam("scheduleType");
    switch (scheduleType) {
      case "1":
        // VACCINATION
        // validate schedule exists
        await VaccinationScheduleValidations
            .existsAndBelongsToUser(model.scheduleId, uid);
        break;
      case "2":
        // MEDICATION
        // TODO - implement
        res.status(501).send({ error: "Not implemented yet." });
        return;
      default:
        res.status(400).send({ error: "Invalid scheduleType value" });
    }
    const docId = await firestore
        .collection(FirestoreCollections.ScheduleReminders)
        .add({
          ...model,
        });
    res.status(201).send({ id: docId.id, ...model });
    return;
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).send({ error: message });
    return;
  }
});
