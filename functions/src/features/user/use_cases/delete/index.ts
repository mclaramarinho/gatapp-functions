import { DeleteUserModel } from "./models/DeleteUserModel";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { firestore } from "../../../../shared/firestore/init";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { onRequest } from "firebase-functions/v2/https";
import { UserManagementForbidden }
  from "../../../../shared/exceptions/users/UserManagementForbidden";
import { UserNotFound } from "../../../../shared/exceptions/users/UserNotFound";
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";

export const deleteUser = onRequest(async (req, res) => {
  try {
    const body = new Map(Object.entries(req.body));
    const model = new DeleteUserModel(body);

    const userIdFromToken = await validateAuthToken(
        getAuthTokenFromRequest(req)
    );

    if (model.id !== userIdFromToken) {
      throw UserManagementForbidden;
    }

    const doc = firestore
        .collection(FirestoreCollections.Users)
        .doc(userIdFromToken);
    if (!(await doc.get()).exists) {
      throw UserNotFound;
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
          const {
            statusCode,
            message,
          } = ExceptionsHandler.handle(error as Error);
          res.status(statusCode).json({ message: message });
        })
        .finally(() => {
          return;
        });
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).json({ message: message });
    return;
  }
});
