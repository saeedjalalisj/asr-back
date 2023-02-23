import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface VoiceResultTextProps {
    value: string;
}

export class VoiceResultText extends ValueObject<VoiceResultTextProps> {
    public static minLength = 2;
    public static maxLength = 10000;

    get value (): string {
        return this.props.value;
    }

    private constructor (props: VoiceResultTextProps) {
        super(props);
    }

    public static create (props: VoiceResultTextProps): Result<VoiceResultText> {
        const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'voiceResultText');

        if (nullGuardResult.isFailure) {
            return Result.fail<VoiceResultText>(nullGuardResult.getErrorValue());
        }

        const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
        const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

        if (minGuardResult.isFailure) {
            return Result.fail<VoiceResultText>(minGuardResult.getErrorValue());
        }

        if (maxGuardResult.isFailure) {
            return Result.fail<VoiceResultText>(maxGuardResult.getErrorValue());
        }

        return Result.ok<VoiceResultText>(new VoiceResultText(props));
    }
}