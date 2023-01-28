import {Entity} from "../../../shared/domain/Entity";
import {ResultId} from "./resultId";
import {ResultText} from "./resultText";
import {ResultGender} from "./resultGender";
import {UniqueEntityID} from "../../../shared/domain/UniqueEntityID";
import { Result as ResultObj } from "../../../shared/core/Result";
import {Guard, IGuardArgument} from "../../../shared/core/Guard";
import { VoiceId } from "./voiceId";

export interface ResultProps {
    text: ResultText;
    gender: ResultGender;
    voiceId: VoiceId;
}

export class Result extends Entity<any>{
    get resultId(): ResultId {
        return ResultId.create(this._id).getValue()
    }

    get voiceId(): string {
        return this.props.voiceId
    }

    get text(): ResultText {
        return this.props.text
    }

    get gender(): ResultGender {
        return this.props.gender
    }

    private constructor(props: ResultProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: ResultProps, id?: UniqueEntityID): ResultObj<Result> {
        const guardArgs: IGuardArgument[] = [
            { argument: props.text, argumentName: 'text' },
            { argument: props.gender, argumentName: 'gender' },
            { argument: props.voiceId, argumentName: 'voiceId' }
        ];
        const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);
        if (guardResult.isFailure) {
            return ResultObj.fail<Result>(guardResult.getErrorValue());
        }
        const defaultValues: ResultProps = {
            ...props
        };
        const voiceResult = new Result(defaultValues, id);
        return ResultObj.ok<Result>(voiceResult);
    }
}