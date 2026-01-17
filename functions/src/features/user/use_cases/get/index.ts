import { onRequest } from "firebase-functions/https";
import { firestore } from "../../../../shared/firestore/init";
import { ExceptionsHandler } from "../../../../shared/handlers/ExceptionsHandler";
import { UserModel } from "./models/UserModel";

export const getUser = onRequest(async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            res.status(400).json({ message: "Missing userId parameter" });
            return;
        }

        const userData = firestore.collection('users').doc(userId.toString());
        const doc = await userData.get();

        if (!doc.exists) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const model = new UserModel(doc.data()!);

        res.status(200).json(model);
        return;
    } catch (error) {
        const responseForException = ExceptionsHandler.handle(error as Error);
        res.status(responseForException.statusCode).json({ message: responseForException.message });
        return;
    }
});