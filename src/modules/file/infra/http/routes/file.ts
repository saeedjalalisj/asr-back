import express from 'express';
import { middleware } from '../../../../../shared/infra/http';
import {createFileController} from "../../../useCases/createFile";

const fileRouter = express.Router();

fileRouter.post("/",
    middleware.ensureAuthenticated(),
    middleware.uploader(),
    (req, res) => createFileController.execute(req, res)
);

export {
    fileRouter
}