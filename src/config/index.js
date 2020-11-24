import { config } from "dotenv";

const { parsed } = config();

export const {
  port,
  MODE,
  BASE_URL,
  SECRET,
  IN_PROD = MODE !== "prod",
  DB = "mongodb://localhost:27017/apollo-ordering-app",
  URL = `${BASE_URL}${port}`,
} = parsed;
