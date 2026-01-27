import { Request } from "firebase-functions/v2/https";

export const getAuthTokenFromRequest = (req: Request) => {
  return req.headers.authorization?.split("Bearer ")[1];
};
