import models from "../../../shared/infra/database/sequelize/models";
import { VoiceRepo } from "./implementations/seqVoiceRepo";

const voiceRepo = new VoiceRepo(models);

export {
    voiceRepo
}