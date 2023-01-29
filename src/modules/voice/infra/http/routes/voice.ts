
import express from 'express';
import { middleware } from '../../../../../shared/infra/http';
import { createVoiceController } from "../../../useCases/voice/createVoice";
import { getVoiceListController } from "../../../useCases/voice/getVoiceList";
import { getVoiceByIdController } from "../../../useCases/voice/getVoiceById";

const voiceRouter = express.Router();

voiceRouter.post('/',
    middleware.ensureAuthenticated(),
    (req, res) => createVoiceController.execute(req, res)
);

voiceRouter.get('/',
    middleware.ensureAuthenticated(),
    (req, res) => getVoiceListController.execute(req, res)
);


voiceRouter.get('/:id',
    middleware.ensureAuthenticated(),
    (req, res) => getVoiceByIdController.execute(req, res)
);
export {
    voiceRouter,
}