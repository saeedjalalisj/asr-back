
import express from 'express'
import { userRouter } from '../../../../modules/users/infra/http/routes';
import {voiceRouter} from "../../../../modules/voice/infra/http/routes";
import {fileRouter} from "../../../../modules/file/infra/http/routes/file";

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  return res.json({ message: "Yo! we're up" });
})

v1Router.use('/users', userRouter);
v1Router.use('/voice', voiceRouter)
v1Router.use('/file', fileRouter);

export { v1Router }