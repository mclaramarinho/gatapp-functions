import { UpdateUserModel } from "./models/UpdateUserModel";
import { firestore } from "../../../../shared/firestore/init";
import { ExceptionsHandler }
  from "../../../../shared/handlers/ExceptionsHandler";
import { FirestoreCollections } from "../../../../shared/firestore/collections";
import { validateAuthToken } from "../../../../shared/auth/validateAuthToken";
import { onRequest } from "firebase-functions/v2/https";
import { MissingQueryParam }
  from "../../../../shared/exceptions/MissingQueryParam";
import { UserManagementForbidden }
  from "../../../../shared/exceptions/users/UserManagementForbidden";
import { UserNotFound } from "../../../../shared/exceptions/users/UserNotFound";
import { getAuthTokenFromRequest }
  from "../../../../shared/auth/getAuthTokenFromRequest";

export const updateUser = onRequest(async (req, res) => {
  try {
    const userIdFromToken = await validateAuthToken(
        getAuthTokenFromRequest(req)
    );

    const userId = req.query.userId as string;
    if (!userId) throw new MissingQueryParam("userId");

    if (userId !== userIdFromToken) throw new UserManagementForbidden();

    const model = new UpdateUserModel(new Map(Object.entries(req.body)));

    const doc = firestore
        .collection(FirestoreCollections.Users)
        .doc(userIdFromToken);

    const userSnapshot = await doc.get();
    if (!userSnapshot.exists) throw new UserNotFound();

    await doc
        .update(Object.fromEntries(Object.entries(model)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, v]) => v !== undefined)));

    res.status(200).json({ message: "User updated successfully" });
    return;
  } catch (error) {
    const { statusCode, message } = ExceptionsHandler.handle(error as Error);
    res.status(statusCode).json({ message: message });
    return;
  }
});
