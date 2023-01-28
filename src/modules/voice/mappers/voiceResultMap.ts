import {Mapper} from "../../../shared/infra/Mapper";
import {Result} from "../domain/result";

export class VoiceResultMap implements Mapper<Result> {
    public static toPersistence(result: Result): any {
        return {
            voice_id: result.voiceId,
            text: result.text.value,
            gender: result.gender,
            updatedAt: new Date().toString(),
        }
    }
}