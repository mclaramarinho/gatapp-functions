/**
 * Exception thrown when the request body is invalid
 */
export class InvalidRequestBodyException extends Error {
  /**
   * @param {string} message
   */
  constructor(message: string) {
    super(message);
    this.name = "InvalidRequestBodyException";
  }
}
