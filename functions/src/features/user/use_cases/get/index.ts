import { onRequest } from "firebase-functions/https";
import { firestore } from "../../../../shared/firestore/init";
import { ExceptionsHandler } from "../../../../shared/handlers/ExceptionsHandler";
import { UserModel } from "./models/UserModel";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { FirestoreCollections } from "../../../../shared/firestore/collections";

export const getUser = onRequest(async (req, res) => {
    try {
        const oauthToken = req.headers.authorization;
        const userId = await validateAuthToken(oauthToken?.replace("Bearer ", ""));
        
        const userData = firestore.collection(FirestoreCollections.Users).doc(userId.toString());
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