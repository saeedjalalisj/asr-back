
import express from 'express';
import { middleware } from '../../../../../shared/infra/http';
import { createVoiceController } from "../../../useCases/voice/createVoice";

const voiceRouter = express.Router();

voiceRouter.post('/',
    middleware.ensureAuthenticated(),
    (req, res) => createVoiceController.execute(req, res)
)

export {
    voiceRouter,
}