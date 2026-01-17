/**
 * Custom exception to indicate unauthorized access attempts
 */
export class UnauthorizedException extends Error {
  /**
   * @param {string} message
   */
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedException";
  }
}
