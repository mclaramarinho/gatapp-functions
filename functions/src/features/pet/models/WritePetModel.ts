import { InvalidRequestBodyException }
  from "../../../shared/exceptions/InvalidRequestBodyException";

/**
 * Model for writing pet data
 */
export class WritePetModel {
  /**
   * Pet name
   *
   * At least 2 characters long
   */
  name: string;
  /**
   * Pedigree ID
   *
   * Will be validated while creating
   */
  pedigree: number;

  /**
   * Color ID
   *
   * Will be validated while creating
   */
  color: string;

  /**
   * Birthdate in ISO8601 format (YYYY-MM-DDTHH:MM:SSZ)
   */
  birthdate: string;

  /**
   * 1 = Female
   *
   * 2 = Male
   */
  biologicalSex: string;

  /**
   * @param {Map<string, any>} input
   */
  constructor(input: Map<string, any>) {
    this.name = input.get("name");
    if (this.name.length < 2) {
      throw new InvalidRequestBodyException(
          "Pet name must be at least 2 characters long"
      );
    }
    // will be validated while creating
    this.pedigree = +(input.get("pedigree") ?? "-1");

    this.color = input.get("color"); // will be validated while creating

    this.birthdate = input.get("birthdate");
    if (!this.birthdate || isNaN(Date.parse(this.birthdate))) {
      throw new InvalidRequestBodyException("Invalid birthdate format");
    }
    const birthDateObj = new Date(this.birthdate);
    const today = new Date();
    if (birthDateObj > today) {
      throw new InvalidRequestBodyException(
          "Birthdate cannot be in the future"
      );
    }

    this.biologicalSex = input.get("biologicalSex"); // 1 = Female | 2 = Male
    if (this.biologicalSex !== "1" && this.biologicalSex !== "2") {
      throw new InvalidRequestBodyException(
          "Biological sex must be '1' (Female) or '2' (Male)"
      );
    }
  }
}
