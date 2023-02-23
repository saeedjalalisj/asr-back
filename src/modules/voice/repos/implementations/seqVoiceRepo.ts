import {IVoiceRepo} from "../voiceRepo";
import {VoiceMap} from "../../mappers/voiceMap";
import {Voice} from "../../domain/voice";
import {VoiceId} from "../../domain/voiceId";

export class VoiceRepo implements IVoiceRepo {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    public async save(voice: Voice): Promise<void> {
        try {
            const rawSeqVoice = await VoiceMap.toPersistence(voice)
            await this.models.Voice.create(rawSeqVoice);
        } catch (err) {
            throw new Error(err.toString())
        }
    }

    public async getVoiceList(page: number, offset: number): Promise<Voice[]> {
        try {
            return await this.models.Voice.findAndCountAll({limit: offset, offset: (page - 1) * offset});
        } catch (e) {
            throw new Error(e.toString())
        }
    }

    public async getVoiceById(voiceId: VoiceId | string): Promise<Voice> {
        try {
            return await this.models.Voice.findOne({ where: { voice_id: voiceId }, include: this.models.Result })
        } catch (e) {
            throw new Error(e.toString())
        }
    }
}