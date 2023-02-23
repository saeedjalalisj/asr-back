import { CreateResult } from "./createResult";
import { voiceResultRepo } from "../../../repos";

const createResult = new CreateResult(voiceResultRepo);

export {
    createResult,
}
