import { Gender } from "../../../../../shared/enums/gender";
import { InvalidRequestBodyException } from "../../../../../shared/exceptions/InvalidRequestBodyException";

export class UpdateUserModel {
    firstName?: string;
    lastName?: string;
    /** ISO 8601 format */
    birthdate?: string;
    gender?: Gender;

    constructor(input: Map<string, any>) {
        if (input.has("firstName")) {
            this.firstName = input.get("firstName");
        }
        if (input.has("lastName")) {
            this.lastName = input.get("lastName");
        }
        if (input.has("birthdate")) {
            this.birthdate = input.get("birthdate");
            const date = new Date(this.birthdate!);
            if (isNaN(date.getTime())) {
                throw new InvalidRequestBodyException("Invalid birthdate format");
            } else {
                const now = new Date().getUTCDate();
                const birthdateUtc = date.getUTCDate();
                if (birthdateUtc > now) {
                    throw new InvalidRequestBodyException("Birthdate cannot be in the future");
                }
            }
        }
        if (input.has("gender")) {
            const genderValue = input.get("gender");
            if (Gender.isValid(genderValue)) {
                this.gender = genderValue;
            } else {
                throw new InvalidRequestBodyException("Invalid gender value");
            }
        }
    }
}