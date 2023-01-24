import {Mapper} from "../../../shared/infra/Mapper";
import {Voice} from "../domain/voice";

export class VoiceMap implements Mapper<Voice> {
    public static toPersistence(voice: Voice): any {
        return {
            title: voice.title.value,
            updatedAt: new Date().toString(),
            voice_id: voice.voiceId.id.toString(),
            status: voice.status,
            file_id: voice.fileId,
            user_id: voice.userId
        }

    }
}