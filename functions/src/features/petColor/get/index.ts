import { onRequest } from "firebase-functions/https";
import { firestore } from "../../../shared/firestore/init";
import { ExceptionsHandler } from "../../../shared/handlers/ExceptionsHandler";
import { FirestoreCollections } from "../../../shared/firestore/collections";
import { PetColorModel } from "../create/models/PetColorModel";

export const getCatColorsList = onRequest(async (req, res) => {
    try {
        const colorsSnapshot = await firestore.collection(FirestoreCollections.CatColors).get();
        const colors = colorsSnapshot.docs.map(doc => {
            const data = doc.data();
            return new PetColorModel(+(doc.id), data.normalizedName, data.displayName);
        });
        res.status(200).json({ colors });
    } catch (error) {
        const errorHandled = ExceptionsHandler.handle(error as Error);
        res.status(errorHandled.statusCode).json({ message: errorHandled.message });
    }
});