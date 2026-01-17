import { onRequest } from "firebase-functions/https";
import { firestore } from "../../../../shared/firestore/init";
import firebase from "firebase/compat/app";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { ExceptionsHandler } from "../../../../shared/handlers/ExceptionsHandler";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { WritePetModel } from "../../models/WritePetModel";

export const createPet = onRequest(async (req, res) => {
    try {
        const body = req.body;
        const model = new WritePetModel(new Map(Object.entries(body)));

        const oauthToken = req.headers.authorization;

        // validate ownerId exists in the system
        const ownerId = await validateAuthToken(oauthToken?.replace("Bearer ", ""));
        const doc = await firestore.collection(FirestoreCollections.Users).doc(ownerId).get();
        if(!doc.exists) {
            res.status(404).json({ message: "Owner not found" });
            return;
        }
        
        // validate pedigree
        const pedigreeId = model.pedigree;
        const pedigreeDoc = await firestore.collection(FirestoreCollections.CatPedigrees).doc(pedigreeId.toString()).get();
        if(!pedigreeDoc.exists) {
            res.status(404).json({ message: "Pedigree not found" });
            return;
        }

        // validate color
        const colorId = model.color;
        const colorDoc = await firestore.collection(FirestoreCollections.CatColors).doc(colorId.toString()).get();
        if(!colorDoc.exists) {
            res.status(404).json({ message: "Color not found" });
            return;
        }

        // save pet
        await firestore.collection(FirestoreCollections.Pets).add({
            name: model.name,
            ownerId: ownerId,
            birthdate: firebase.firestore.Timestamp.fromDate(new Date(model.birthdate)),
            pedigree: model.pedigree,
            color: model.color,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).json({ message: "Pet created successfully" });
        return;
    } catch (error) {
        const errorHandled = ExceptionsHandler.handle(error as Error);
        res.status(errorHandled.statusCode).json({ message: errorHandled.message });
        return;
    }
});