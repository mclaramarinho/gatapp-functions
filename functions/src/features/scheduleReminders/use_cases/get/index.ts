import { onRequest } from "firebase-functions/v2/https";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { validateAuthToken }
  from "../../../../shared/auth/validateAuthToken";
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";
import { MissingQueryParam }
  from "../../../../shared/exceptions/MissingQueryParamException";
import { ScheduleReminderValidations }
  from "../../../../shared/validations/ScheduleReminderValidations";
import { ScheduleType } from "../../../../shared/enums/scheduleType";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { NotImplementedException }
  from "../../../../shared/exceptions/NotImplementedException";
import { DocumentData } from "firebase-admin/firestore";
import { InvalidQueryParam }
  from "../../../../shared/exceptions/InvalidQueryParameterException";
import { PetValidations } from "../../../../shared/validations/PetValidations";

export const getScheduleReminder = onRequest(async (req, res) => {
  try {
    const id = req.params.scheduleId;
    if (!id) throw new MissingQueryParam("scheduleId");

    const scheduleTypeId = req.params.scheduleId;
    if (!scheduleTypeId) throw new MissingQueryParam("scheduleTypeId");

    const uid = await validateAuthToken(getAuthTokenFromRequest(req));

    let scheduleType;
    try {
      scheduleType = ScheduleType.fromId(+scheduleTypeId);
    } catch {
      throw new InvalidQueryParam(
          "scheduleTypeId",
          ScheduleType.validValues
      );
    }

    await ScheduleReminderValidations
        .existsAndBelongsToUser(id, uid, scheduleType);

    const doc = await firestore
        .collection(FirestoreCollections.ScheduleReminders)
        .doc(id)
        .get();

    res.status(200).send({ ...doc });
    return;
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).send(message);
    return;
  }
});

export const getAllReminders = onRequest(async (req, res) => {
  try {
    const uid = await validateAuthToken(getAuthTokenFromRequest(req));
    const petId = req.params.petId;
    if (!petId) throw new MissingQueryParam("petId");

    await PetValidations.existsAndBelongsToUser(petId, uid);

    const scheduleTypeId = req.params.scheduleTypeId;
    if (!scheduleTypeId) throw new MissingQueryParam("scheduleTypeId");

    const scheduleType = ScheduleType.fromId(+scheduleTypeId);
    if (!scheduleType.collection) throw new NotImplementedException();

    const petSchedules = await firestore
        .collection(scheduleType.collection)
        .where("petId", "==", petId)
        .get();

    if (petSchedules.empty) {
      res.status(200).send({ reminders: [] });
      return;
    }
    const schedules: DocumentData[] = [];
    petSchedules.docs.map(async (sn) => {
      const data = sn.data();
      if (data) {
        schedules.push(data);
      }
    });

    let reminders: DocumentData[] = [];
    for (let i = 0; i < schedules.length; i++) {
      const data = schedules[i];
      const rems = await firestore
          .collection(FirestoreCollections.ScheduleReminders)
          .where("scheduleId", "==", data.id)
          .get();
      if (!rems.empty) {
        reminders.push(rems);
      }
    }
    reminders = reminders.flat();

    res.status(200).send({ reminders: reminders });
    return;
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).send(message);
    return;
  }
});

