import { onRequest } from "firebase-functions/v2/https";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { validateAuthToken }
  from "../../../../shared/auth/validateAuthToken";
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";
import { ScheduleReminderValidations }
  from "../../../../shared/validations/ScheduleReminderValidations";
import { ScheduleType } from "../../../../shared/enums/scheduleType";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";

interface IUpdateScheduleReminder {
  reminderId: string;
  scheduleTypeId: number;
  remindTime: number;
  periodTypeId: number;
}

export const updateScheduleReminder = onRequest(async (req, res) => {
  try {
    const uid = await validateAuthToken(getAuthTokenFromRequest(req));
    const body = req.body as IUpdateScheduleReminder;
    const scheduleType = ScheduleType.fromId(body.scheduleTypeId);
    await ScheduleReminderValidations.existsAndBelongsToUser(
        body.reminderId,
        uid,
        scheduleType
    );

    const doc = firestore
        .collection(FirestoreCollections.ScheduleReminders)
        .doc(body.reminderId);

    await doc.update({
      remindTime: body.remindTime,
      periodTypeId: body.periodTypeId,
    });

    res.status(200).send({ message: "Success!" });
    return;
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).send(message);
    return;
  }
});
