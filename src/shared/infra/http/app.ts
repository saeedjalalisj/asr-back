import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { v1Router } from './api/v1';
import { port } from '../../../config';
import * as fs from "fs";

const origin = {
  // origin: isProduction ? 'https://dddforum.com' : '*',
  origin: "*"
}

if (!fs.existsSync(`${process.cwd()}/uploads`)) {
  fs.mkdirSync(`${process.cwd()}/uploads`);
}
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(origin))
app.use(compression())
app.use(helmet())
app.use(morgan('combined'))

app.use('/api/v1', v1Router)

app.listen(port, () => {
  console.log(`[App]: Listening on port ${port}`)
})