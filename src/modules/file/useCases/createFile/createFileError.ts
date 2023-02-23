import {Result} from "../../../../shared/core/Result";
import {UseCaseError} from "../../../../shared/core/UseCaseError";

export namespace CreateFileError {
    export class CreateFileErrorUnexpected extends Result<UseCaseError> {
        constructor () {
            super(false, {
                message: `CreateFileErrorUnexpected.`
            } as UseCaseError)
        }
    }
}