import { UnauthorizedException } from "../exceptions/UnauthorizedException";
import { auth } from "./init";

/**
*
* Validates oauth token
*
* @param {string | undefined} token
*
* @return {string} `uid` of authenticated user
*
* @throws {UnauthorizedException} if token is invalid
*/
export const validateAuthToken =
  async (token: string | undefined): Promise<string> => {
    if (!token) {
      throw new UnauthorizedException("Missing auth token");
    }
    return auth.verifyIdToken(token)
        .then((decodedToken) => {
          return decodedToken.uid;
        })
        .catch(() => {
          throw new UnauthorizedException("Invalid auth token");
        });
  };
