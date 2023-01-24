import { SendToAI } from "./sendToAI";
import {fileRepo} from "../../../../file/repos";

const sendToAI = new SendToAI(fileRepo);

export {
    sendToAI
}