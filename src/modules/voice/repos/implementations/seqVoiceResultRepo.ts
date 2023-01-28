import {IVoiceResultRepo} from "../voiceResultRepo";
import {Result} from "../../domain/result";
import {VoiceResultMap} from "../../mappers/voiceResultMap";

export class VoiceResultRepo implements IVoiceResultRepo {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    public async save(result: Result): Promise<any> {
        try {
            const rawSeqResult = await VoiceResultMap.toPersistence(result);
            await this.models.Result.create(rawSeqResult);
        } catch (err) {
            throw new Error(err.toString())
        }
    }
}