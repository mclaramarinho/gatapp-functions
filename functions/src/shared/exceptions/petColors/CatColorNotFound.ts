import { ICustomException } from "../ICustomException";

/**
 * Exceptions thrown when pet color is not found in database
 */
export class CatColorNotFound extends Error implements ICustomException {
  statusCode: number;

  /**
   */
  constructor() {
    super("Cat color does not exist.");
    this.statusCode = 404;
    this.name = "CatColorNotFound";
  }
}
