import e from "express";
import { Request } from "firebase-functions/https";
import { validateAuthToken } from "../auth/validateAuthToken";

export class RequestAuthorization {
    static async authorize(req: Request, res: e.Response) {
        const oauthToken = req.headers.authorization;
        const userIdFromToken = await validateAuthToken(oauthToken?.replace('Bearer ', ''));
        return userIdFromToken;
    }
}