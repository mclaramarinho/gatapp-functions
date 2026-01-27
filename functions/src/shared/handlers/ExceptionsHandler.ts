import { ICustomException } from "../exceptions/ICustomException";
import { InvalidRequestBodyException }
  from "../exceptions/InvalidRequestBodyException";

import { UnauthorizedException }
  from "../exceptions/UnauthorizedException";

export interface ResponseForExceptionInterface {
  statusCode: number;
  message: string;
}

/**
 * Handles exceptions and maps them to appropriate HTTP responses.
 */
export class ExceptionsHandler {
  /**
   * @param {Error} exception
   * @return {ResponseForExceptionInterface}
   */
  static handle(
      exception: Error | ICustomException
  ) : ResponseForExceptionInterface {
    if ("statusCode" in exception) {
      return { statusCode: exception.statusCode, message: exception.message };
    }

    return { statusCode: 500, message: "Internal Server Error" };
  }
}
