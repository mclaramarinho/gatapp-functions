import { onRequest } from "firebase-functions/https";
import { CreateUserModel } from "./models/CreateUserModel";
import { ExceptionsHandler } from "../../../../shared/handlers/ExceptionsHandler";

export const createUser = onRequest((request, response) => {
    try {
        const body = request.body;

        const model = new CreateUserModel(new Map(Object.entries(body)));

        // TODO - save firstName, lastName, email, birthdate, gender, googleId, termsAcceptedAt, termsAccepted

        response.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        const responseForException = ExceptionsHandler.handle(error as Error);
        response.status(responseForException.statusCode).send({ error: responseForException.message });
        return;
    }
});