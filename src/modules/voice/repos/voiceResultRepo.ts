import {Result} from "../domain/result";

export interface IVoiceResultRepo {
    save(result: Result): Promise<any>
}