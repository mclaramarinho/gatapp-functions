import { onRequest } from "firebase-functions/v2/https";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { CreateScheduleReminderModel }
  from "./models/CreateScheduleReminderModel";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";

/**
 * HTTP function to create a schedule reminder in Firestore.
 */
export const createScheduleReminder = onRequest(async (req, res) => {
  try {
    const authToken = req.headers.authorization?.split("Bearer ")[1];
    const uid = await validateAuthToken(authToken);

    // TODO - validate schedule exists

    // TODO - validate schedule pet belongs to user (uid)

    const body = req.body;

    const model = new CreateScheduleReminderModel(body);

    const docId = await firestore
        .collection(FirestoreCollections.ScheduleReminders)
        .add({
          ...model,
        });
    res.status(201).send({ id: docId.id });
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).send({ error: message });
  }
});
