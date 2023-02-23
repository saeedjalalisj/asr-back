import { GetVoiceById } from "./getVoiceById";
import { voiceRepo } from "../../../repos";
import { GetVoiceByIdController } from "./getVoiceByIdController";

const getVoiceById = new GetVoiceById(voiceRepo);
const getVoiceByIdController = new GetVoiceByIdController(getVoiceById);

export {
    getVoiceById,
    getVoiceByIdController
}