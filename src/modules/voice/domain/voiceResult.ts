import { Entity } from "../../../shared/domain/Entity";
import {VoiceResultId} from "./voiceResultId";
import {VoiceResultText} from "./voiceResultText";

export interface VoiceResultProps {
    text: VoiceResultText;
    date?: string | Date;
}

export class VoiceResult extends Entity<VoiceResultProps> {
    get voiceResultId(): VoiceResultId {
        return VoiceResultId.create(this._id).getValue();
    }
    get text(): VoiceResultText {
        return this.props.text;
    }
    get date(): (string | Date) {
        return this.props.date;
    }

}