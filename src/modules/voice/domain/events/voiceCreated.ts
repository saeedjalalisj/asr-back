

import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Voice } from "../voice";

export class VoiceCreated implements IDomainEvent {
    public dateTimeOccurred: Date;
    public voice: Voice;

    constructor(voice: Voice) {
        this.dateTimeOccurred = new Date();
        this.voice = voice;
    }

    getAggregateId (): UniqueEntityID {
        return this.voice.id;
    }
}