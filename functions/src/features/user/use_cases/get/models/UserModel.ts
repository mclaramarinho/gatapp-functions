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

    constructor(input: FirebaseFirestore.DocumentData) {
        this.id = input.get('id');
        this.googleId = input.get('googleId');
        this.email = input.get('email');
        this.firstName = input.get('firstName');
        this.lastName = input.get('lastName');
        this.birthdate = input.get('birthdate');
        this.gender = input.get('gender');
        this.termsAccepted = input.get('termsAccepted');
        this.termsAcceptedAt = new Date(input.get('termsAcceptedAt'));
        this.createdAt = input.get('createdAt');
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