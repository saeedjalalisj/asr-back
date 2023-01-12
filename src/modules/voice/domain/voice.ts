import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import {VoiceFilePath} from "./voiceFilePath";
import {VoiceTitle} from "./voiceTitle";
import {VoiceResult} from "./voiceResult";
import {VoiceStatus} from "./voiceStatus";
import {Result} from "../../../shared/core/Result";
import {Guard, IGuardArgument} from "../../../shared/core/Guard";
import {VoiceCreated} from "./events/voiceCreated";
import {VoiceId} from "./voiceId";

export interface VoiceProps {
    filePath: VoiceFilePath;
    title: VoiceTitle;
    result: VoiceResult
    status: VoiceStatus;
}

export class Voice extends AggregateRoot<VoiceProps> {

    get voiceId(): VoiceId {
        return VoiceId.create(this._id).getValue();
    }
    get filePath(): VoiceFilePath {
        return this.props.filePath;
    }

    get title(): VoiceTitle {
        return this.props.title;
    }

    get status(): VoiceStatus {
        return this.props.status
    }

    private constructor (props: VoiceProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: VoiceProps, id?: UniqueEntityID): Result<Voice> {
        const guardArgs: IGuardArgument[] = [
            { argument: props.filePath, argumentName: 'filePath' },
            { argument: props.title, argumentName: 'title' },
            { argument: props.status, argumentName: 'status' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

        if (guardResult.isFailure) {
            return Result.fail<Voice>(guardResult.getErrorValue());
        }

        const defaultValues: VoiceProps = {
            ...props
        };

        const isNewVoice =!!id === false;

        const voice = new Voice(defaultValues, id);
        if (isNewVoice) {
            voice.addDomainEvent(new VoiceCreated(voice));
        }

        return Result.ok<Voice>(voice)
    }
}