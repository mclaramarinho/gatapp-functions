import { ICustomException } from "./ICustomException";

/**
 * Custom exception to indicate unauthorized access attempts
 */
export class MissingQueryParam extends Error implements ICustomException {
  statusCode: number;

  /**
   * @param {string} param
   */
  constructor(param: string) {
    super(`Missing ${param} query parameter.`);
    this.name = "MissingQueryParam";
    this.statusCode = 400;
  }
}
