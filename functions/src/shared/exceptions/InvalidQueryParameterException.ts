import { ICustomException } from "./ICustomException";

/**
 * Custom exception to indicate unauthorized access attempts
 */
export class InvalidQueryParam extends Error implements ICustomException {
  statusCode: number;

  /**
   * @param {string} param
   * @param {string[]} validValues
   */
  constructor(param: string, validValues: string[]) {
    const lastValid = validValues[validValues.length - 1];
    validValues.pop();
    super(`Invalid ${param} query parameter. 
      Expected: ${validValues} or ${lastValid}.`);
    this.name = "InvalidQueryParam";
    this.statusCode = 400;
  }
}
