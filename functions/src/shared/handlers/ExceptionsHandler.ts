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
  static handle(exception: Error): ResponseForExceptionInterface {
    if (exception instanceof InvalidRequestBodyException) {
      return { statusCode: 422, message: exception.message };
    }

    if (exception instanceof UnauthorizedException) {
      return { statusCode: 401, message: exception.message };
    }

    return { statusCode: 500, message: "Internal Server Error" };
  }
}
