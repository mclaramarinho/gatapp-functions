import { DeleteUserModel } from "./models/DeleteUserModel";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { firestore } from "../../../../shared/firestore/init";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { onRequest } from "firebase-functions/v2/https";

export const deleteUser = onRequest(async (req, res) => {
  try {
    const body = new Map(Object.entries(req.body));
    const model = new DeleteUserModel(body);

    const oauthToken = req.headers.authorization;
    const userIdFromToken = await validateAuthToken(
        oauthToken?.replace("Bearer ", "")
    );

    if (model.id !== userIdFromToken) {
      res.status(403)
          .json({ message: "You can only delete your own user account" });
      return;
    }

    const doc = firestore
        .collection(FirestoreCollections.Users)
        .doc(userIdFromToken);
    if (!(await doc.get()).exists) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const data = (await doc.get()).data();
    if (data?.email !== model.email ||
      data?.googleId !== model.googleId ||
      data?.id !== model.id) {
      res.status(400).json({ message: "User data does not match" });
      return;
    }

    doc.delete()
        .then(() => {
          res.status(204).json({ message: "User deleted successfully" });
        })
        .catch((error) => {
          const errorData = ExceptionsHandler.handle(error as Error);
          res.status(errorData.statusCode).json({ message: errorData.message });
        })
        .finally(() => {
          return;
        });
  } catch (error) {
    const errorData = ExceptionsHandler.handle(error as Error);
    res.status(errorData.statusCode).json({ message: errorData.message });
    return;
  }
});
