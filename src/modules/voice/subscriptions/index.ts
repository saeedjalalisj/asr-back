import { AfterVoiceCreated} from "./afterVoiceCreated";
import { sendToAI } from "../useCases/voice/sendToAI";

new AfterVoiceCreated(sendToAI);