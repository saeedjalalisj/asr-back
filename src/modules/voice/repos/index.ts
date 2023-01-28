import models from "../../../shared/infra/database/sequelize/models";
import { VoiceRepo } from "./implementations/seqVoiceRepo";
import { VoiceResultRepo } from "./implementations/seqVoiceResultRepo";

const voiceRepo = new VoiceRepo(models);
const voiceResultRepo = new VoiceResultRepo(models)

export {
    voiceRepo,
    voiceResultRepo
}