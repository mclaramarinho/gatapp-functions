import { firestore } from "../../../../shared/firestore/init";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { UserModel } from "./models/UserModel";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { onRequest } from "firebase-functions/v2/https";
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";
import { UserNotFound } from "../../../../shared/exceptions/users/UserNotFound";

export const getUser = onRequest(async (req, res) => {
  try {
    const userId = await validateAuthToken(getAuthTokenFromRequest(req));

    const userData = firestore
        .collection(FirestoreCollections.Users)
        .doc(userId.toString());
    const doc = await userData.get();

    if (!doc.exists) throw UserNotFound;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const model = new UserModel(doc.data()!);
    res.status(200).json(model);
    return;
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).json({ message: message });
    return;
  }
});
