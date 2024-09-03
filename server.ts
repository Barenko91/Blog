import express from "express";
import 'dotenv/config';
import router from "./router";
import errorHandler from "./middleware/error";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet, { contentSecurityPolicy, hsts } from "helmet";
import logger from "./utils/logger";
import httpLogger from "./middleware/httpLogs";

const PORT = process.env.PORT || 3000;
const app = express();
const cookiesSecret = process.env.SECRET_COOKIES_KEY
const corsOptions = {
  origin: 'http://localhost:4000/',
  optionsSuccessStatus: 200
};
app.use(express.json());
app.use(cookieParser(cookiesSecret));
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger)
if (process.env.NODE_ENV === 'development') {
  app.use(cors(corsOptions))
  app.use(helmet({
    contentSecurityPolicy: false,
    hsts: false
  }))
}else {
  app.use(cors())
  app.use(helmet())
}
app.use(router);
app.use(errorHandler)
app.listen(PORT, () => {
  console.info(`app is running on http://localhost:${PORT}`);
});
