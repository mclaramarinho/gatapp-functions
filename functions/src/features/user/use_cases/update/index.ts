import { onRequest } from "firebase-functions/https";
import { UpdateUserModel } from "./models/UpdateUserModel";
import { firestore } from "../../../../shared/firestore/init";
import { ExceptionsHandler } from "../../../../shared/handlers/ExceptionsHandler";
import { FirestoreCollections } from "../../../../shared/firestore/collections";

export const updateUser = onRequest(async (req, res) => {
    try {
        const userId = req.query.userId as string;
        if (!userId) {
            res.status(400).json({ message: "Missing userId query parameter" });
            return;
        }

        const body = req.body;
        const model = new UpdateUserModel(new Map(Object.entries(body)));

        const doc = firestore.collection(FirestoreCollections.Users).doc(req.query.userId as string);

        const userSnapshot = await doc.get();
        if (!userSnapshot.exists) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        await doc.update(Object.fromEntries(Object.entries(model).filter(([_, v]) => v !== undefined)));

        res.status(200).json({ message: "User updated successfully" });
        return;
    } catch (error) {
        const handleResult = ExceptionsHandler.handle(error as Error);
        res.status(handleResult.statusCode).json({ message: handleResult.message });
        return;
    }
});