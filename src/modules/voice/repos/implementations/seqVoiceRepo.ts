import {IVoiceRepo} from "../voiceRepo";
import {VoiceMap} from "../../mappers/voiceMap";
import {Voice} from "../../domain/voice";

export class VoiceRepo implements IVoiceRepo {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    private async save(voice: Voice): Promise<void>{
        try {
            const rawSeqVoice = await VoiceMap.toPersistence(voice)
            await this.models.Voice.create(rawSeqVoice);
        } catch (err) {
            throw new Error(err.toString())
        }
    }
}