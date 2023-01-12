import { Voice } from "../domain/voice";
import {VoiceId} from "../domain/voiceId";

export interface IVoiceRepo {
    save(voice: Voice): Promise<void>;
    // getVoiceById(voiceId: VoiceId | string): Promise<Voice>;
    // getVoiceList(page: number, offset: number): Promise<Voice[]>
}