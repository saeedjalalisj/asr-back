import { CreateVoice } from "./createVoice";
import { voiceRepo } from "../../../repos";
import { CreateVoiceController } from "./createVoiceController";

const createVoice = new CreateVoice(voiceRepo);
const createVoiceController = new CreateVoiceController(createVoice);

export {
    createVoice,
    createVoiceController,
}