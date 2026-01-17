import { onRequest } from "firebase-functions/https";
import { CreateUserModel } from "./models/CreateUserModel";
import { ExceptionsHandler } from "../../../../shared/handlers/ExceptionsHandler";
import firebase from "firebase/compat/app";
import { firestore } from "../../../../shared/firestore/init";

export const createUser = onRequest((request, response) => {
    try {
        const body = request.body;

        const model = new CreateUserModel(new Map(Object.entries(body)));

        // check if the user with the same googleId and email already exists
        firestore.collection('users').where('email', '==', model.email).get().then((querySnapshot) => {
            if (!querySnapshot.empty) {
                response.status(409).send({ error: 'User with the same email already exists' });
                return;
            }
        });

        // save firstName, lastName, email, birthdate, gender, googleId, termsAcceptedAt, termsAccepted
        firestore.collection('users').add({
            firstName: model.firstName,
            lastName: model.lastName,
            email: model.email,
            birthdate: model.birthdate,
            gender: model.gender,
            googleId: model.googleId,
            termsAcceptedAt: firebase.firestore.Timestamp.fromDate(model.termsAcceptedAt),
            termsAccepted: model.termsAccepted,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        response.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        const responseForException = ExceptionsHandler.handle(error as Error);
        response.status(responseForException.statusCode).send({ error: responseForException.message });
        return;
    }
});