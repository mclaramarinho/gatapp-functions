import { Gender } from "../../../../../shared/enums/gender";
import { InvalidRequestBodyException }
  from "../../../../../shared/exceptions/InvalidRequestBodyException";

/**
 * Model for creating a new user
 */
export class CreateUserModel {
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
  /** ISO 8601 format */
  birthdate: string;
  gender: Gender;
  termsAcceptedAt: Date;
  termsAccepted: boolean;

  /**
   * @param {Map<string, any>} input
   */
  constructor(input: Map<string, any>) {
    this.googleId = input.get("googleId");

    this.email = input.get("email");

    this.firstName = input.get("firstName");
    this.lastName = input.get("lastName");

    this.birthdate = input.get("birthdate");

    if (!Gender.isValid(input.get("gender"))) {
      throw new InvalidRequestBodyException("Invalid gender value");
    }
    this.gender = input.get("gender");

    this.termsAccepted = input.get("termsAccepted");
    if (!this.termsAccepted) {
      throw new InvalidRequestBodyException("Terms must be accepted");
    }
    this.termsAcceptedAt = new Date(input.get("termsAcceptedAt"));
    if (isNaN(this.termsAcceptedAt.getTime())) {
      throw new InvalidRequestBodyException(
          "Invalid termsAcceptedAt date format"
      );
    }
  }
}
