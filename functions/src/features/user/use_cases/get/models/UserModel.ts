import { Gender } from "../../../../../shared/enums/gender";

/**
 * UserModel
 *
 * Represents a user in the system.
 */
export class UserModel {
  id: string;
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
  /** ISO 8601 format */
  birthdate: string;
  gender: Gender;
  termsAcceptedAt: Date;
  termsAccepted: boolean;
  createdAt: string;

  /**
   * @param {FirebaseFirestore.DocumentData} input
   */
  constructor(input: FirebaseFirestore.DocumentData) {
    this.id = input.get("id");
    this.googleId = input.get("googleId");
    this.email = input.get("email");
    this.firstName = input.get("firstName");
    this.lastName = input.get("lastName");
    this.birthdate = input.get("birthdate");
    this.gender = input.get("gender");
    this.termsAccepted = input.get("termsAccepted");
    this.termsAcceptedAt = new Date(input.get("termsAcceptedAt"));
    this.createdAt = input.get("createdAt");
  }
}
