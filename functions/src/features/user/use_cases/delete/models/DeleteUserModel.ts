import { InvalidRequestBodyException } from "../../../../../shared/exceptions/InvalidRequestBodyException";

export class DeleteUserModel {
    id: string;
    googleId: string;
    email: string;

    constructor(body: Map<string, any>) {
        this.id = body.get("id");
        this.googleId = body.get("googleId");
        this.email = body.get("email");

        if(!this.id) {
            throw new InvalidRequestBodyException("id is required");
        }

        if(!this.googleId) {
            throw new InvalidRequestBodyException("googleId is required");
        }

        if(!this.email) {
            throw new InvalidRequestBodyException("email is required");
        }
    }
}