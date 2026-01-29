import { onRequest } from "firebase-functions/v2/https";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { ScheduleReminderValidations }
  from "../../../../shared/validations/ScheduleReminderValidations";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { ScheduleType } from "../../../../shared/enums/scheduleType";

interface IDeleteScheduleReminderBody {
  reminderId: string;
  scheduleTypeId: number;
}

/**
 * Delete schedule reminder
 */
export const deleteScheduleReminder = onRequest(async (req, res) => {
  try {
    const uid = await validateAuthToken(getAuthTokenFromRequest(req));
    const body = req.body as IDeleteScheduleReminderBody;
    await ScheduleReminderValidations.existsAndBelongsToUser(
        body.reminderId,
        uid,
        ScheduleType.fromId(body.scheduleTypeId)
    );

    const doc = firestore
        .collection(FirestoreCollections.ScheduleReminders)
        .doc(body.reminderId);
    await doc.delete();
    res.status(204).send({ message: "Success!" });
    return;
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).send(message);
    return;
  }
});
