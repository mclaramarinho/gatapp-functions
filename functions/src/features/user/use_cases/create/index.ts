import { CreateUserModel } from "./models/CreateUserModel";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { onRequest } from "firebase-functions/v2/https";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

export const createUser = onRequest((request, response) => {
  try {
    const body = request.body;

    const model = new CreateUserModel(new Map(Object.entries(body)));

    // check if the user with the same googleId and email already exists
    firestore.collection(FirestoreCollections.Users)
        .where("email", "==", model.email)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            response.status(409)
                .send({ error: "User with the same email already exists" });
            return;
          }
        });

    firestore.collection(FirestoreCollections.Users).add({
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
    const responseForException = ExceptionsHandler.handle(error as Error);
    response.status(responseForException.statusCode)
        .send({ error: responseForException.message });
    return;
  }
});
