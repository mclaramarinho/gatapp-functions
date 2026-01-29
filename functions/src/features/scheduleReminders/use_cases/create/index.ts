import { onRequest } from "firebase-functions/v2/https";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { CreateScheduleReminderModel }
  from "./models/CreateScheduleReminderModel";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { MissingQueryParam }
  from "../../../../shared/exceptions/MissingQueryParamException";
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";
import { VaccinationScheduleValidations }
  from "../../../../shared/validations/VaccinationScheduleValidations";
import { InvalidQueryParam }
  from "../../../../shared/exceptions/InvalidQueryParameterException";
import { PeriodTypeValidations }
  from "../../../../shared/validations/PeriodTypeValidations";
import { ScheduleType } from "../../../../shared/enums/scheduleType";
import { NotImplementedException }
  from "../../../../shared/exceptions/NotImplementedException";

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
        throw new NotImplementedException();
      default:
        throw new InvalidQueryParam("scheduleType", ScheduleType.validValues);
    }

    await PeriodTypeValidations.exists(model.periodTypeId);

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
