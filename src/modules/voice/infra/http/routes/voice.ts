
import express from 'express';
import { middleware } from '../../../../../shared/infra/http';
import { createVoiceController } from "../../../useCases/voice/createVoice";
import {getVoiceListController} from "../../../useCases/voice/getVoiceList";

const voiceRouter = express.Router();

voiceRouter.post('/',
    middleware.ensureAuthenticated(),
    (req, res) => createVoiceController.execute(req, res)
);

voiceRouter.get('/',
    middleware.ensureAuthenticated(),
    (req, res) => getVoiceListController.execute(req, res)
);

export {
    voiceRouter,
}