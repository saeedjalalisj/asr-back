import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import {VoiceTitle} from "./voiceTitle";
import {VoiceResult} from "./voiceResult";
import {VoiceStatus} from "./voiceStatus";
import {Result} from "../../../shared/core/Result";
import {Guard, IGuardArgument} from "../../../shared/core/Guard";
import {VoiceCreated} from "./events/voiceCreated";
import {VoiceId} from "./voiceId";

export interface VoiceProps {
    fileId: string;
    title: VoiceTitle;
    result: VoiceResult
    status: VoiceStatus;
    userId: string;
    lang: string;
}

export class Voice extends AggregateRoot<VoiceProps> {

    get voiceId(): VoiceId {
        return VoiceId.create(this._id).getValue();
    }
    get fileId(): string {
        return this.props.fileId;
    }

    get userId(): string {
        return this.props.userId;
    }

    get title(): VoiceTitle {
        return this.props.title;
    }

    get status(): VoiceStatus {
        return this.props.status
    }

    get lang(): string {
        return this.props.lang
    }

    private constructor (props: VoiceProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: VoiceProps, id?: UniqueEntityID): Result<Voice> {
        const guardArgs: IGuardArgument[] = [
            { argument: props.fileId, argumentName: 'fileId' },
            { argument: props.title, argumentName: 'title' },
            { argument: props.status, argumentName: 'status' },
            { argument: props.userId, argumentName: 'userId' }
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