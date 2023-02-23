import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard} from "../../../shared/core/Guard";

interface VoiceTitleProps {
    value: string
}

export class VoiceTitle extends ValueObject<VoiceTitleProps> {
    public static minLength = 2;
    public static maxLength = 100;

    get value (): string {
        return this.props.value;
    }

    private constructor (props: VoiceTitleProps) {
        super(props);
    }

    public static create(props: VoiceTitleProps): Result<VoiceTitle> {
        const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'voiceTitle');

        if (nullGuardResult.isFailure) {
            return Result.fail<VoiceTitle>(nullGuardResult.getErrorValue());
        }

        const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
        const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

        if (minGuardResult.isFailure) {
            return Result.fail<VoiceTitle>(minGuardResult.getErrorValue());
        }

        if (maxGuardResult.isFailure) {
            return Result.fail<VoiceTitle>(maxGuardResult.getErrorValue());
        }

        return Result.ok<VoiceTitle>(new VoiceTitle(props));
    }
}