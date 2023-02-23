import {ValueObject} from "../../../shared/domain/ValueObject";
import {Result} from "../../../shared/core/Result";
import {Guard} from "../../../shared/core/Guard";

interface ResultTextProps {
    value: string;
}

export class ResultText extends ValueObject<ResultTextProps> {

    get value (): string {
        return this.props.value;
    }

    private constructor (props: ResultTextProps) {
        super(props);
    }

    public static create(props: ResultTextProps): Result<ResultText> {
        const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'resultText');
        if (nullGuardResult.isFailure) {
            return Result.fail<ResultText>(nullGuardResult.getErrorValue());
        }

        return Result.ok<ResultText>(new ResultText(props));
    }
}