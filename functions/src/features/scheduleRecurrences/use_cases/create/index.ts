import { onRequest } from "firebase-functions/v2/https";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";
import { ScheduleType } from "../../../../shared/enums/scheduleType";
import { firestore } from "../../../../shared/firestore/init";
import { VaccinationScheduleValidations }
  from "../../../../shared/validations/VaccinationScheduleValidations";
import { NotImplementedException }
  from "../../../../shared/exceptions/NotImplementedException";
import { FirestoreCollections } from "../../../../shared/firestore/collections";

interface ICreateScheduleRecurrence {
  scheduleId: string;
  repeatTimes: number;
  repeatPeriodTypeId: number;
  scheduleTypeId: number;
}

export const createScheduleRecurrence = onRequest(async (req, res) => {
  try {
    const uid = await validateAuthToken(getAuthTokenFromRequest(req));
    const body = req.body as ICreateScheduleRecurrence;
    const scheduleType = ScheduleType.fromId(body.scheduleTypeId);

    switch (scheduleType.id) {
      case 1:
        await VaccinationScheduleValidations
            .existsAndBelongsToUser(body.scheduleId, uid);
        break;
      case 2:
        throw new NotImplementedException();
    }

    const recurrence = await firestore
        .collection(FirestoreCollections.ScheduleRecurrences)
        .add({
          scheduleId: body.scheduleId,
          repeatTimes: body.repeatTimes,
          repeatPeriodTypeId: body.repeatPeriodTypeId,
        });

    const data = (await recurrence.get()).data();
    res.status(201).send({ ...data });
    return;
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).send(message);
    return;
  }
});
