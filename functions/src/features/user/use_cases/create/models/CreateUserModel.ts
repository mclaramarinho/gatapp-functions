import { InvalidRequestBodyException } from "../../../../../shared/exceptions/InvalidRequestBodyException";

export class CreateUserModel {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    birthdate: string; // ISO 8601 format
    gender: Gender;

    constructor(input: Map<string, any>) {
        this.googleId = input.get('googleId');
        
        this.email = input.get('email');
        
        this.firstName = input.get('firstName');
        this.lastName = input.get('lastName');

        this.birthdate = input.get('birthdate');

        if(!Gender.isValid(input.get('gender'))) {
            throw new InvalidRequestBodyException('Invalid gender value');
        }
        this.gender = input.get('gender');
    }
}


class Gender {
    static male = 1;
    static female = 2;
    static nonBinary = 3;
    static other = 4;

    static isValid(value: number): boolean {
        return value === Gender.male || value === Gender.female || value === Gender.nonBinary || value === Gender.other;
    }
}