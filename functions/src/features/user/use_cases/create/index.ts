import { CreateUserModel } from "./models/CreateUserModel";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { onRequest } from "firebase-functions/v2/https";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { UserEmailAlreadyExists }
  from "../../../../shared/exceptions/users/UserEmailAlreadyExists";

export const createUser = onRequest(async (request, response) => {
  try {
    const body = request.body;

    const model = new CreateUserModel(new Map(Object.entries(body)));

    firestore.collection(FirestoreCollections.Users)
        .where("email", "==", model.email)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            throw new UserEmailAlreadyExists();
          }
        });

    await firestore.collection(FirestoreCollections.Users).add({
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      birthdate: model.birthdate,
      gender: model.gender,
      googleId: model.googleId,
      termsAcceptedAt: Timestamp.fromDate(
          model.termsAcceptedAt
      ),
      termsAccepted: model.termsAccepted,
      createdAt: FieldValue.serverTimestamp(),
    });

    response.status(201).send({ message: "User created successfully" });
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    response.status(statusCode).send({ error: message });
    return;
  }
});
