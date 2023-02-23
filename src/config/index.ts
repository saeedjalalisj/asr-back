
import dotenv from "dotenv";
dotenv.config();
import { authConfig } from "./auth";

const isProduction = process.env.IS_PRODUCTION === "true";

const port = process.env.PORT || 5000;

export {
  isProduction,
  authConfig,
  port
}