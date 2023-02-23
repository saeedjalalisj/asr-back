
import { UseCaseError } from "../../../../../shared/core/UseCaseError";
import { Result } from "../../../../../shared/core/Result";

export namespace CreateVoiceErrors {
    export class UserDoesntExistError extends Result<UseCaseError> {
        constructor () {
            super(false, {
                message: `A User doesn't exist for this voice.`
            } as UseCaseError)
        }
    }

}