import { IHandle } from "../../../shared/domain/events/IHandle";
import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { VoiceCreated } from "../domain/events/voiceCreated";
import { SendToAI } from "../useCases/voice/sendToAI/sendToAI";

export class AfterVoiceCreated implements IHandle<VoiceCreated> {
    private sendToAI: SendToAI
    constructor(sendToAI: SendToAI) {
        this.setupSubscriptions();
        this.sendToAI = sendToAI;
    }

    setupSubscriptions(): void {
        // Register to the domain event
        DomainEvents.register(this.onVoiceCreated.bind(this), VoiceCreated.name);
    }

    private async onVoiceCreated (event: VoiceCreated): Promise<void> {
        try {
            await this.sendToAI.execute({ fileId: event.voice.fileId, language: "fa" });
            console.log(`[onVoiceCreated]: Updated voice stats for ${event.voice.title.value}`);
        } catch (err) {
            console.log(`[onVoiceCreated]: Failed to voice post stats for {${event.voice.title.value}}`);
        }
    }
}