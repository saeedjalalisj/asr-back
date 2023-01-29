import { VoiceRepo } from "../../../repos/implementations/seqVoiceRepo";
import { GetVoiceListController } from "./getVoiceListController";
import {GetVoiceList} from "./getVoiceList";
import {voiceRepo} from "../../../repos";

const getVoiceList = new GetVoiceList(voiceRepo);

const getVoiceListController = new GetVoiceListController(
    getVoiceList
);

export {
    getVoiceListController
}