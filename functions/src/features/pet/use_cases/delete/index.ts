import { onRequest } from "firebase-functions/https";
import { firestore } from "../../../../shared/firestore/init";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { ExceptionsHandler } from "../../../../shared/handlers/ExceptionsHandler";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";

export const deletePet = onRequest(async (req, res) => {
    try {
        const petId = req.query.petId as string;
        if (!petId) {
            res.status(400).json({ message: "petId query parameter is required" });
            return;
        }
        const oauthToken = req.headers.authorization;
        const ownerIdFromToken = await validateAuthToken(oauthToken?.replace("Bearer ", ""));

        const petDocRef = firestore.collection(FirestoreCollections.Pets).doc(petId);
        const petDoc = await petDocRef.get();
        if (!petDoc.exists) {
            res.status(404).json({ message: "Pet not found" });
            return;
        }

        const petData = petDoc.data();
        if (petData?.ownerId !== ownerIdFromToken) {
            res.status(403).json({ message: "You do not have permission to delete this pet" });
            return;
        }

        await petDocRef.delete();
        
        res.status(204).json({ message: "Pet deleted successfully" });
        return;
    } catch (error) {
        const errorHandled = ExceptionsHandler.handle(error as Error);
        res.status(errorHandled.statusCode).json({ message: errorHandled.message });
        return;
    }
});