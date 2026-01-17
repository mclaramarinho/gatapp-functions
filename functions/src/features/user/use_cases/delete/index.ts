import { onRequest } from "firebase-functions/https";
import { DeleteUserModel } from "./models/DeleteUserModel";
import { ExceptionsHandler } from "../../../../shared/handlers/ExceptionsHandler";
import { firestore } from "../../../../shared/firestore/init";

export const deleteUser = onRequest(async (req, res) => {
    try {
        const body = new Map(Object.entries(req.body));
        const model = new DeleteUserModel(body);

        const doc = firestore.collection('users').doc(model.id);

        doc.get().then((doc) => {
            if (!doc.exists) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
        });

        doc.delete()
            .then(() => {
                res.status(204).json({ message: 'User deleted successfully' });
            })
            .catch((error) => {
                const errorData = ExceptionsHandler.handle(error as Error);
                res.status(errorData.statusCode).json({ message: errorData.message });
                return;
            });

    } catch (error) {
        const errorData = ExceptionsHandler.handle(error as Error);
        res.status(errorData.statusCode).json({ message: errorData.message });
        return;
    }
});